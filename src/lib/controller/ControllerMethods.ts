import type {
	Controller,
	ControllerRoute,
	ControllerMethod,
	ControllerVersion,
	ControllerConstructor,
} from "./Controller";

export function makeMethodDecorator(method: ControllerMethod) {
	return (route: ControllerRoute = "/", version?: ControllerVersion) =>
		(controller: Controller, propertyKey: string) => {
			const routes = Reflect.getMetadata("routes", controller) ?? [];
			routes.push({ controller, version, method, route, propertyKey });

			Reflect.defineMetadata("routes", routes, controller);
		};
}

export interface ControllerRouteMetadata {
	controller: ControllerConstructor;
	version: ControllerVersion;
	method: ControllerMethod;
	route: ControllerRoute;
	propertyKey: string;
}

export const Get = makeMethodDecorator("GET");
export const Post = makeMethodDecorator("POST");
export const Put = makeMethodDecorator("PUT");
export const Delete = makeMethodDecorator("DELETE");
export const Patch = makeMethodDecorator("PATCH");
