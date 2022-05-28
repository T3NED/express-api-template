import type { Prisma } from "@prisma/client";
import { Logger } from "#utils";

export const queryTime: Prisma.Middleware = async (params, next) => {
	const startTime = performance.now();
	const result = await next(params);
	const timeTook = performance.now() - startTime;
	console.log(params);

	Logger.info(`Query ${params.model}.${params.action} -> ${timeTook}ms`);

	return result;
};
