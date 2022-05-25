import type { Request, Response, NextFunction } from "express";

export const catchServerError = (promiseFunc: PromiseFunc) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			return await promiseFunc(req, res, next);
		} catch (error) {
			return next(error);
		}
	};
};

export type PromiseFunc = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;
