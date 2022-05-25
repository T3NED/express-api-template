import { HttpStatus } from "#constants/http";

export abstract class Controller {
	protected json(data: ControllerJsonData, status = HttpStatus.Ok): ControllerData {
		return { status, data };
	}
}

export interface ControllerData {
	status: HttpStatus;
	data: ControllerJsonData;
}

export type ControllerJsonData = Record<string | number, unknown>;
