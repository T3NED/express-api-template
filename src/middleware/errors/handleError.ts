import type { Request, Response, NextFunction } from "express";
import type { ApiError } from "#struct";

export const handleError = (
	error: ApiError,
	_req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_next: NextFunction,
): void => {
	res.status(error.status).json(error.toJSON());
};
