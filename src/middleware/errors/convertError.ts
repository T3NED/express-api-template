import type { Request, Response, NextFunction } from "express";
import { ApiError, InternalServerError } from "#struct";
import { Logger } from "#utils";

export const convertError = (error: Error, _req: Request, _res: Response, next: NextFunction): void => {
	if (error instanceof ApiError) return next(error);

	Logger.error(error.message, {
		error: {
			message: error.message,
			stack: error.stack,
		},
	});

	next(InternalServerError());
};
