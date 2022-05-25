import { Controller, ControllerData, controller, Get, Middleware } from "#lib/controller";
import { Logger } from "#utils";

@controller({
	baseRoute: "/example",
	defaultVersion: "v1",
})
export default class ExampleController extends Controller {
	@Get("/", "v1")
	@Middleware(async (req, _res, next) => {
		// Logger middleware
		Logger.info(`${req.method} ${req.path}`);
		next();
	})
	public getExample(): ControllerData {
		return this.json({
			this: {
				is: {
					an: "example",
				},
			},
			of: {
				a: "controller",
			},
		});
	}
}
