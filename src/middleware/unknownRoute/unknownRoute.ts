import type { Request, Response, NextFunction } from "express";
import { UnknownRoute } from "#struct";

export const unknownRoute = (_req: Request, _res: Response, next: NextFunction): void => {
	next(UnknownRoute());
};
