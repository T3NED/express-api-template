import type { Request, Response } from "express";
import { HttpStatus } from "#constants/http";

export abstract class Controller {
	public baseRoute: ControllerRoute;
	public defaultVersion: ControllerVersion;

	public constructor(options: Partial<ControllerOptions> = {}) {
		this.baseRoute = options.baseRoute ?? "/";
		this.defaultVersion = options.defaultVersion ?? "v1";
	}

	protected json(data: unknown, status = HttpStatus.Ok): ControllerData {
		return { status, data };
	}
}

export interface ControllerOptions {
	baseRoute: ControllerRoute;
	defaultVersion: ControllerVersion;
}

export interface ControllerData {
	status: HttpStatus;
	data: unknown;
}

export interface ControllerContext {
	req: Request;
	res: Response;
	query: unknown;
	params: unknown;
	body: unknown;
}

export type ControllerRoute = `/${string}`;
export type ControllerVersion = `v${number}`;
export type ControllerMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type ControllerConstructor = new (options?: Partial<ControllerOptions>) => Controller;
export type ControllerRunMethod = (context: ControllerContext) => Promise<ControllerData>;
