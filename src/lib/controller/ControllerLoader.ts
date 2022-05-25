import type { ControllerMiddleware, ControllerMiddlewareMetadata } from "./ControllerMiddleware";
import type { ControllerValidateMetadata, ControllerValidationSchema } from "./ControllerValidation";
import type { ControllerRouteMetadata } from "./ControllerMethods";
import type { Controller, ControllerRunMethod } from "./Controller";
import type { AnySchema, ObjectSchema } from "joi";

import { unknownRoute, convertError, handleError } from "#middleware";
import { catchServerError, Logger } from "#utils";
import { HttpStatus } from "#constants/http";
import express, { Express } from "express";
import { readdir } from "fs/promises";
import { join, resolve } from "path";
import { port } from "#config/app";
import Joi from "joi";
import cors from "cors";

export class ControllerLoader {
	public constructor(private app: Express) {}

	public async serve(): Promise<void> {
		this._applyPreloadMiddleware();

		await this.loadAll();

		this._applyPostloadMiddleware();
		this._listen();
	}

	private async loadAll(): Promise<void> {
		Logger.debug("Loading controllers...");

		const directory = join(__dirname, "..", "..", "controllers");

		const path = resolve(directory);
		for await (const file of this._recursiveReaddir(path)) {
			if (file.endsWith(".map")) continue;
			await this._load(`${path}/${file}`);
		}
	}

	private async _load(path: string): Promise<void> {
		const mod = await import(path).catch(() => null);
		if (!mod?.default) return;

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

			const routeHandler = catchServerError(async (req, res) => {
				const controllerRunMethod = Reflect.get(controller, propertyKey) as ControllerRunMethod;
				const result = await controllerRunMethod.bind(controller)({ req, res });

				return res.status(result.status).send(result.data);
			});

			routerMethod.bind(this.app)(fullRoute, ...routerMiddleware, routeHandler);

			Logger.debug(`Loaded ${method} ${fullRoute}`);
		}

		Logger.info("Successfully loaded controllers");
	}

	private async *_recursiveReaddir(directory: string): AsyncIterableIterator<string> {
		const path = resolve(directory);

		for (const file of await readdir(path, { withFileTypes: true })) {
			if (file.isDirectory()) yield* this._recursiveReaddir(`${path}/${file.name}`);
			else yield file.name;
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

	private _getValidationSchemaMap(validation: ControllerValidateMetadata[] = []): ObjectSchema {
		const schemas = validation.reduce((map, curr) => {
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

		const entries = Object.entries(schemas);
		const compiledSchemas = entries.map(([key, schema]) => [
			key,
			Joi.compile(schema).prefs({ errors: { label: "key" } }),
		]);

		return Object.fromEntries(compiledSchemas);
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
