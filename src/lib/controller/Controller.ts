import type { Request, Response } from "express";
import { HttpStatus } from "#constants/http";

export abstract class Controller {
	public options: ControllerOptions;

	public constructor(options: Partial<ControllerOptions> = {}) {
		this.options = {
			baseRoute: options.baseRoute ?? "/",
			defaultVersion: options.defaultVersion ?? "v1",
		};
	}

	protected json(data: ControllerJsonData, status = HttpStatus.Ok): ControllerData {
		return { status, data };
	}
}

export interface ControllerOptions {
	baseRoute: ControllerRoute;
	defaultVersion: ControllerVersion;
}

export interface ControllerData {
	status: HttpStatus;
	data: ControllerJsonData;
}

export interface ControllerContext {
	req: Request;
	res: Response;
}

export type ControllerRoute = `/${string}`;
export type ControllerVersion = `v${number}`;
export type ControllerMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type ControllerConstructor = new (options?: Partial<ControllerOptions>) => Controller;
export type ControllerRunMethod = (context: ControllerContext) => Promise<ControllerData>;

export type ControllerJsonData = Record<string | number, unknown> | ControllerJsonData[];
