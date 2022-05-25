import type { RateLimit } from "./RateLimit";
import { RedisProvider } from "#providers";
import { sha1 } from "#utils";

export class RateLimiter {
	public static async consume(ratelimit: RateLimit, token: string): Promise<ConsumedToken> {
		const hash = this._resolveHash(ratelimit, token);
		const count = await this._incrementBucketCount(hash);
		const remaining = Math.max(ratelimit.bucket.limit - count, 0);
		const isRatelimited = count > ratelimit.bucket.limit;
		const retryAfter = await this._setBucketRetryAfter(hash, ratelimit.bucket.retryAfter);
		const resetAt = Date.now() + retryAfter;

		return {
			hash,
			remaining,
			isRatelimited,
			retryAfter: retryAfter / 1000,
			resetAt: resetAt / 1000,
		};
	}

	public static async reset(ratelimit: RateLimit, token: string): Promise<void> {
		const hash = this._resolveHash(ratelimit, token);
		await RedisProvider.get().del(this._getRedisKey(hash));
	}

	public static async remaining(ratelimit: RateLimit, token: string): Promise<number> {
		const hash = this._resolveHash(ratelimit, token);
		const count = await this._getBucketCount(hash);
		return ratelimit.bucket.limit - count;
	}

	private static _incrementBucketCount(hash: string): Promise<number> {
		return RedisProvider.get().incr(this._getRedisKey(hash));
	}

	private static async _setBucketRetryAfter(hash: string, retryAfter: number): Promise<number> {
		const existingRetryAfter = await this._getBucketRetryAfter(hash);
		if (existingRetryAfter > 0) return existingRetryAfter;
		await RedisProvider.get().pexpire(this._getRedisKey(hash), retryAfter);
		return retryAfter;
	}

	private static async _getBucketRetryAfter(hash: string): Promise<number> {
		return RedisProvider.get().pttl(this._getRedisKey(hash));
	}

	private static async _getBucketCount(hash: string): Promise<number> {
		const result = await RedisProvider.get().get(this._getRedisKey(hash));
		return result ? Number(result) : 0;
	}

	private static _resolveHash(ratelimit: RateLimit, token: string): string {
		return sha1(this._resolveKey(ratelimit, token));
	}

	private static _resolveKey(ratelimit: RateLimit, token: string): string {
		const idKey = `${ratelimit.majorParameter}:${ratelimit.id}`;
		const bucketKey = `${ratelimit.bucket.limit}:${ratelimit.bucket.limit}:${token}`;
		return `${idKey}:${bucketKey}`;
	}

	private static _getRedisKey(hash: string): string {
		return `ratelimit:${hash}`;
	}
}

export interface ConsumedToken {
	hash: string;
	remaining: number;
	isRatelimited: boolean;
	retryAfter: number;
	resetAt: number;
}
