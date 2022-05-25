import type { ControllerRouteMetadata } from "./ControllerMethods";
import type { Controller, ControllerRunMethod } from "./Controller";
import { catchServerError, Logger } from "#utils";
import type { Router } from "express";
import { readdir } from "fs/promises";
import { resolve } from "path";

export class ControllerLoader {
	public constructor(protected router: Router) {}

	protected async _loadAll(directory: string) {
		Logger.debug("Loading controllers...");

		const path = resolve(directory);
		for await (const file of this._recursiveReaddir(path)) {
			if (file.endsWith(".map")) continue;
			await this._load(`${path}/${file}`);
		}
	}

	protected async _load(path: string) {
		const mod = await import(path).catch(() => null);
		if (!mod?.default) return;

		const controller = new mod.default(this) as Controller;
		const metadata = Reflect.getMetadata("routes", controller) as ControllerRouteMetadata[];

		for (const { version, method, route, propertyKey } of metadata) {
			const fullRoute = `/api/${version}${route}`;
			const routerMethod = Reflect.get(this.router, method.toString());

			const routeHandler = catchServerError(async (req, res) => {
				const controllerRunMethod = Reflect.get(controller, propertyKey) as ControllerRunMethod;
				const result = await controllerRunMethod.bind(controller)({ req, res });

				return res.status(result.status).send(result.data);
			});

			routerMethod(fullRoute, routeHandler);

			Logger.info(`Loaded ${method} ${fullRoute}`);
		}
	}

	protected async *_recursiveReaddir(directory: string): AsyncIterableIterator<string> {
		const path = resolve(directory);

		for (const file of await readdir(path, { withFileTypes: true })) {
			if (file.isDirectory()) yield* this._recursiveReaddir(`${path}/${file.name}`);
			else yield file.name;
		}
	}
}
