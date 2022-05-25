import { regex } from "#constants/snowflake";
import Joi from "joi";

export const snowflakeValidation = Joi.string()
	.pattern(regex)
	.custom(BigInt)
	.error(new Error("Value is not a snowflake"));
