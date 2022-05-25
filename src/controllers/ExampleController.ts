import { Controller, ControllerData, controller, Get } from "#lib/controller";

@controller({
	baseRoute: "/example",
	defaultVersion: "v1",
})
export default class ExampleController extends Controller {
	@Get("/", "v1")
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
