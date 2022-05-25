import type { ControllerRouteMetadata } from "./ControllerMethods";
import type { Controller, ControllerRunMethod } from "./Controller";
import { catchServerError, Logger } from "#utils";
import type { Express } from "express";
import { readdir } from "fs/promises";
import { join, resolve } from "path";
import { port } from "#config/app";
import { HttpStatus } from "#constants/http";
import { unknownRoute, convertError, handleError } from "#middleware";
import cors from "cors";
import express from "express";

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
		const metadata = Reflect.getMetadata("routes", controller) as ControllerRouteMetadata[];

		for (const { version, method, route, propertyKey } of metadata) {
			const v = version ?? controller.defaultVersion;
			const controllerRoute = controller.baseRoute === "/" ? "" : controller.baseRoute;
			const fullRoute = `/api/${v}${controllerRoute}${route}`;

			const routerMethod = Reflect.get(this.app, method.toString().toLowerCase());

			const routeHandler = catchServerError(async (req, res) => {
				const controllerRunMethod = Reflect.get(controller, propertyKey) as ControllerRunMethod;
				const result = await controllerRunMethod.bind(controller)({ req, res });

				return res.status(result.status).send(result.data);
			});

			routerMethod.bind(this.app)(fullRoute, routeHandler);

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
