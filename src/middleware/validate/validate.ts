import joi, { ArraySchema, ObjectSchema } from "joi";
import type { Request, Response, NextFunction } from "express";
import { ApiError, ApiErrorCode } from "#struct";
import { HttpStatus } from "#constants/http";
import { catchServerError } from "#utils";

const extractRequestSchemaKeys = (req: Request, schemaKeys: RequestKey[]) => {
	return schemaKeys.reduce((pickedObj, schemaKey) => {
		if (Reflect.has(req, schemaKey)) pickedObj[schemaKey] = req[schemaKey];
		return pickedObj;
	}, {} as Record<keyof Request, unknown>);
};

export const validate = (schema: Record<string, ObjectSchema | ArraySchema>) => {
	return catchServerError(async (req: Request, res: Response, next: NextFunction) => {
		const schemaKeys = Reflect.ownKeys(schema) as RequestKey[];
		const validationObject = extractRequestSchemaKeys(req, schemaKeys);

		const { value, error } = joi
			.compile(schema)
			.prefs({ errors: { label: "key" } })
			.validate(validationObject);

		if (error) {
			const message = error.isJoi ? error.details[0].message : error.message;

			throw new ApiError()
				.setStatus(HttpStatus.BadRequest)
				.setCode(ApiErrorCode.BadRequest)
				.setMessage(message);
		}

		res.locals = { ...res.locals, ...value };

		return next();
	});
};

export type RequestKey = keyof Request;
