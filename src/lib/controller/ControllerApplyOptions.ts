import type { Controller, ControllerOptions } from "./Controller";

export const controller = (options: Partial<ControllerOptions>): Function => {
	return (Controller: ControllerConstructor<Controller>) => {
		return class extends Controller {
			public constructor() {
				super(options);
			}
		};
	};
};

export type ControllerConstructor<M extends Controller> = new (options: Partial<ControllerOptions>) => M;
