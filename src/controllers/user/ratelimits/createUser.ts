import { RateLimit, ratelimit } from "#struct";

export const createUser = new RateLimit()
	.setMajorParameter("users")
	.setId(ratelimit().users.get)
	.setBucket(3, 60_000);
