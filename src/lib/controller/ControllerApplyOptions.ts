import type { ControllerConstructor, ControllerOptions } from "./Controller";

export const controller = (options: Partial<ControllerOptions>): Function => {
	return (Controller: ControllerConstructor) => {
		return class extends Controller {
			public constructor() {
				super(options);
			}
		};
	};
};
