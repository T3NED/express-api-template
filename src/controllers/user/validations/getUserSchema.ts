import { snowflakeValidation } from "#validations";
import Joi from "joi";

export const getUserByIdParamsSchema = Joi.object({
	id: snowflakeValidation,
});

export interface GetUserByIdParams {
	id: bigint;
}

export const searchUserByUsernameQuerySchema = Joi.object({
	username: Joi.string() //
		.trim()
		.required(),
	limit: Joi.number() //
		.integer()
		.min(1)
		.max(100)
		.default(50),
	before: snowflakeValidation,
	after: snowflakeValidation,
});

export interface SearchUserByUsernameQuery {
	username: string;
	limit: number;
	before?: bigint;
	after?: bigint;
}
