export class RateLimit {
	public majorParameter!: string;
	public id!: string;
	public bucket!: RateLimitBucket;

	public setMajorParameter(majorParameter: string): this {
		this.majorParameter = majorParameter;
		return this;
	}

	public setId(id: string): this {
		this.id = id;
		return this;
	}

	public setBucket(limit: number, retryAfter: number): this {
		this.bucket = { limit, retryAfter };
		return this;
	}
}

export interface RateLimitBucket {
	limit: number;
	retryAfter: number;
}
