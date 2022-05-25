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
	baseRoute: `/${string}`;
	defaultVersion: `v${number}`;
}

export interface ControllerData {
	status: HttpStatus;
	data: ControllerJsonData;
}

export type ControllerJsonData = Record<string | number, unknown>;
