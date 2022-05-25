import type { NextFunction, Request, Response } from "express";
import type { Controller, ControllerConstructor } from "./Controller";

export function Middleware(func: ControllerMiddleware) {
	return (controller: Controller, propertyKey: string) => {
		const middleware = Reflect.getMetadata("middleware", controller) ?? [];
		middleware.push({ controller, propertyKey, func });

		Reflect.defineMetadata("middleware", middleware, controller);
	};
}

export interface ControllerMiddlewareMetadata {
	controller: ControllerConstructor;
	func: ControllerMiddleware;
	propertyKey: string;
}

export type ControllerMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;
