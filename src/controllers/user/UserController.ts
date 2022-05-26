import type { CreateUserBody, UpdateUserParams, UpdateUserBody } from "./validations";

import {
	Controller,
	ControllerData,
	ControllerContext,
	Post,
	Patch,
	Params,
	Body,
	controller,
} from "#lib/controller";

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

	/**
	 * Update a user
	 */
	@Patch("/:id")
	@Params(validation.updateUserParamsSchema)
	@Body(validation.updateUserBodySchema)
	public async updateUser(context: ControllerContext): Promise<ControllerData> {
		const params = context.params as UpdateUserParams;
		const body = context.body as UpdateUserBody;

		const user = await UserService.update(params.id, {
			username: body.username,
			bio: body.bio,
		});

		return this.json(UserMapper.map(user));
	}
}
