import type {
	CreateUserBody,
	UpdateUserParams,
	UpdateUserBody,
	DeleteUserParams,
	GetUserByIdParams,
	SearchUserByUsernameQuery,
} from "./validations";

import {
	Controller,
	ControllerData,
	ControllerContext,
	Get,
	Post,
	Patch,
	Delete,
	Query,
	Params,
	Body,
	controller,
} from "#lib/controller";

import { HttpStatus } from "#constants/http";
import { UserService } from "#services";
import { UserMapper } from "#mappers";
import * as validation from "./validations";
import { UnknownUser } from "#struct";

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

	/**
	 * Delete a user
	 */
	@Delete("/:id")
	@Params(validation.deleteUserParamsSchema)
	public async deleteUser(context: ControllerContext) {
		const params = context.params as DeleteUserParams;

		await UserService.delete(params.id);

		return context.res.status(HttpStatus.NoContent).send();
	}

	/**
	 * Search a user by username
	 */
	@Get("/search")
	@Query(validation.searchUserByUsernameQuerySchema)
	public async searchUserByUsername(context: ControllerContext) {
		const query = context.query as SearchUserByUsernameQuery;

		const users = await UserService.searchByUsername(query.username, {
			limit: query.limit,
			before: query.before,
			after: query.after,
		});

		return this.json(users.map(UserMapper.map));
	}

	/**
	 * Get a user by id
	 */
	@Get("/:id")
	@Params(validation.getUserByIdParamsSchema)
	public async getUserById(context: ControllerContext) {
		const params = context.params as GetUserByIdParams;

		const user = await UserService.getById(params.id);
		if (!user) throw UnknownUser();

		return this.json(UserMapper.map(user));
	}
}
