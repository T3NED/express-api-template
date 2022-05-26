import { snowflakeValidation } from "#validations";
import Joi from "joi";

export const deleteUserParamsSchema = Joi.object({
	id: snowflakeValidation,
});

export interface DeleteUserParams {
	id: bigint;
}
