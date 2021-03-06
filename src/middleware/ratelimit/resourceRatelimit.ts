import type { Request, Response, NextFunction } from "express";
import { RateLimiter, RateLimit, TooManyRequests } from "#struct";
import { HttpHeader } from "#constants/http";
import { catchServerError } from "#utils";

export const resourceRatelimit = (ratelimit: RateLimit) => {
	return catchServerError(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const requesterId = HttpHeader.RealIp ?? req.ip; // change this if authorization is implemented
		const consumedToken = await RateLimiter.consume(ratelimit, requesterId);

		res.setHeader(HttpHeader.RateLimitBucket, consumedToken.hash);
		res.setHeader(HttpHeader.RateLimitLimit, ratelimit.bucket.limit);
		res.setHeader(HttpHeader.RateLimitRemaining, consumedToken.remaining);
		res.setHeader(HttpHeader.RateLimitReset, consumedToken.resetAt.toFixed(3));
		res.setHeader(HttpHeader.RateLimitRetryAfter, consumedToken.retryAfter.toFixed(3));

		if (consumedToken.isRatelimited) throw TooManyRequests();

		next();
	});
};
