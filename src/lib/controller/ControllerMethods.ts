import type { Controller } from "./Controller";

export type ControllerMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type ControllerRoute = `/${string}`;

export function makeMethodDecorator(method: ControllerMethod) {
	return (route: ControllerRoute = "/") =>
		(controller: Controller, propertyKey: string) => {
			const routes = Reflect.getMetadata("routes", controller) ?? [];

			routes.push({
				method,
				route,
				controller,
				propertyKey,
			});

			Reflect.defineMetadata("routes", routes, controller);
		};
}

export const Get = makeMethodDecorator("GET");
export const Post = makeMethodDecorator("POST");
export const Put = makeMethodDecorator("PUT");
export const Delete = makeMethodDecorator("DELETE");
export const Patch = makeMethodDecorator("PATCH");
