import type { CreateUserBody } from "./validations";

import { Controller, ControllerData, ControllerContext, Post, controller, Body } from "#lib/controller";
import { UserService } from "#services";
import * as validation from "./validations";
import { UserMapper } from "#mappers";

@controller({
	baseRoute: "/users",
	defaultVersion: "v1",
})
export default class UserController extends Controller {
	/**
	 * Create a user
	 */
	@Post("/")
	@Body(validation.createUserBodySchema)
	public async createUser(context: ControllerContext): Promise<ControllerData> {
		const body = context.body as CreateUserBody;

		const user = await UserService.create({
			username: body.username,
		});

		return this.json(UserMapper.map(user));
	}
}
