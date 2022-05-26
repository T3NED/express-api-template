import { snowflakeValidation } from "#validations";
import Joi from "joi";

export const updateUserParamsSchema = Joi.object({
	id: snowflakeValidation,
});

export interface UpdateUserParams {
	id: bigint;
}

export const updateUserBodySchema = Joi.object({
	username: Joi.string()
		.regex(/^[a-zA-Z]\w*$/)
		.min(3)
		.max(12)
		.trim(),
	bio: Joi.string() //
		.min(1)
		.max(255)
		.trim(),
}).or("username", "bio");

export interface UpdateUserBody {
	username?: string;
	bio?: string;
}
