import type { ControllerMiddleware, ControllerMiddlewareMetadata } from "./ControllerMiddleware";
import type { ControllerValidateMetadata, ControllerValidationSchema } from "./ControllerValidation";
import type { ControllerRouteMetadata } from "./ControllerMethods";

import { unknownRoute, convertError, handleError } from "#middleware";
import { Controller, ControllerRunMethod } from "./Controller";
import express, { Express, Request } from "express";
import { catchServerError, Logger } from "#utils";
import { ApiError, ApiErrorCode } from "#struct";
import { HttpStatus } from "#constants/http";
import { readdir } from "fs/promises";
import { port } from "#config/app";
import { join } from "path";
import cors from "cors";
import Joi from "joi";

export class ControllerLoader {
	public constructor(private app: Express) {}

	public async serve(): Promise<void> {
		const startTime = performance.now();

		this._applyPreloadMiddleware();

		await this.loadAll();

		this._applyPostloadMiddleware();
		this._listen();

		Logger.debug(`Loaded in ${(performance.now() - startTime).toFixed(2)} ms`);
	}

	private async loadAll(): Promise<void> {
		Logger.debug("Loading controllers...");

		const path = join(__dirname, "..", "..", "controllers");

		for await (const file of this._recursiveReaddir(path)) {
			if (file.endsWith(".map")) continue;
			await this._load(file);
		}

		Logger.info("Successfully loaded controllers");
	}

	private async _load(path: string): Promise<void> {
		const mod = await import(path).catch((error) =>
			Logger.error(error, {
				error: {
					message: error.message,
					stack: error.stack,
				},
			}),
		);

		if (!mod?.default || !(mod.default.prototype instanceof Controller)) return;

		const controller = new mod.default(this) as Controller;

		const routes = Reflect.getMetadata("routes", controller) as ControllerRouteMetadata[];
		const middleware = Reflect.getMetadata("middleware", controller) as ControllerMiddlewareMetadata[];
		const validation = Reflect.getMetadata("validation", controller) as ControllerValidateMetadata[];

		const runMethodToMiddlewareMap = this._getRunMethodToMiddlewareMap(middleware);
		const validationSchema = this._getValidationSchemaMap(validation);

		for (const { version, method, route, propertyKey } of routes) {
			const v = version ?? controller.defaultVersion;
			const controllerRoute = controller.baseRoute === "/" ? "" : controller.baseRoute;
			const fullRoute = `/api/${v}${controllerRoute}${route}`;

			const routerMethod = Reflect.get(this.app, method.toString().toLowerCase());
			const routerMiddleware = runMethodToMiddlewareMap[propertyKey] ?? [];

			const validationMiddlewareSchema = validationSchema[propertyKey];
			const validationMiddleware = this._getValidationSchemaMiddleware(validationMiddlewareSchema);

			const routeHandler = catchServerError(async (req, res) => {
				const controllerRunMethod = Reflect.get(controller, propertyKey) as ControllerRunMethod;
				const result = await controllerRunMethod.bind(controller)({
					req,
					res,
					query: res.locals.query,
					params: res.locals.params,
					body: res.locals.body,
				});

				return res.status(result.status).send(result.data);
			});

			routerMethod.bind(this.app)(fullRoute, ...routerMiddleware, validationMiddleware, routeHandler);

			Logger.debug(`Loaded ${method} ${fullRoute}`);
		}
	}

	private async *_recursiveReaddir(path: string): AsyncIterableIterator<string> {
		for (const file of await readdir(path, { withFileTypes: true })) {
			if (file.isDirectory()) yield* this._recursiveReaddir(`${path}/${file.name}`);
			else yield `${path}/${file.name}`;
		}
	}

	private _getRunMethodToMiddlewareMap(
		middleware: ControllerMiddlewareMetadata[] = [],
	): Record<string, ControllerMiddleware[]> {
		return middleware.reduce((map, curr) => {
			if (!map[curr.propertyKey]) map[curr.propertyKey] = [];
			map[curr.propertyKey].push(curr.func);
			return map;
		}, {} as Record<string, ControllerMiddleware[]>);
	}

	private _getValidationSchemaMap(
		validation: ControllerValidateMetadata[] = [],
	): Record<string, ControllerValidationSchema> {
		return validation.reduce((map, curr) => {
			if (!map[curr.propertyKey]) map[curr.propertyKey] = {};

			const keys = Object.keys(curr.schema);

			keys.forEach((key) => {
				if (Reflect.get(map[curr.propertyKey], key))
					throw new Error(`Validation for ${key} is already defined for ${curr.propertyKey}`);

				const schema = Reflect.get(curr.schema, key);
				Reflect.set(map[curr.propertyKey], key, schema);
			});

			return map;
		}, {} as Record<string, ControllerValidationSchema>);
	}

	private _getValidationSchemaMiddleware(schema: ControllerValidationSchema = {}) {
		const keys = Reflect.ownKeys(schema) as (keyof ControllerValidationSchema)[];

		return catchServerError(async (req, res, next) => {
			const dataToValidate = keys.reduce((obj, key) => {
				if (Reflect.has(req, key)) obj[key] = req[key];
				return obj;
			}, {} as Record<keyof Request, unknown>);

			const { value, error } = Joi.compile(schema)
				.prefs({ errors: { label: "key" } })
				.validate(dataToValidate);

			if (error) {
				const message = error.isJoi ? error.details[0].message : error.message;

				throw new ApiError()
					.setStatus(HttpStatus.BadRequest)
					.setCode(ApiErrorCode.BadRequest)
					.setMessage(message);
			}

			res.locals = { ...res.locals, ...value };

			return next();
		});
	}

	private _applyPreloadMiddleware(): void {
		Logger.debug("Applying pre-load middleware...");

		this.app.use(cors({ origin: "*", optionsSuccessStatus: HttpStatus.Ok, credentials: true }));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));

		Logger.debug("Applied pre-load middleware");
	}

	private _applyPostloadMiddleware(): void {
		Logger.debug("Applying post-load middleware...");

		this.app.use(unknownRoute);
		this.app.use(convertError);
		this.app.use(handleError);

		Logger.debug("Applied post-load middleware");
	}

	private _listen(): void {
		Logger.debug("Starting server...");

		this.app.listen(port, "0.0.0.0", () => {
			Logger.info(`Serving on http://localhost:${port}`);
		});
	}
}
