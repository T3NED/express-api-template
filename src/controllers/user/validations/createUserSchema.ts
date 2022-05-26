import Joi from "joi";

export const createUserBodySchema = Joi.object({
	username: Joi.string()
		.regex(/^[a-zA-Z]\w*$/)
		.min(3)
		.max(12)
		.trim()
		.required(),
});

export interface CreateUserBody {
	username: string;
}
