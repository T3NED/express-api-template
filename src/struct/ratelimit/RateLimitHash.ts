import { sha1 } from "#utils";

const methods: RateLimitMethod[] = ["get", "post", "put", "patch", "delete"];

const isMethod = (value: string): value is RateLimitMethod => {
	return methods.includes(value as RateLimitMethod);
};

export const ratelimit = (base = "ratelimit"): RateLimitHashRoute => {
	const argGetter = () => null;
	argGetter.route = base;

	return new Proxy(argGetter, {
		get: ({ route }, key: string) => (isMethod(key) ? sha1(route) : ratelimit(`${route}:${key}`)),
		apply: ({ route }, _, [arg]) => ratelimit(arg ? `${route}:${arg}` : route),
	}) as unknown as RateLimitHashRoute;
};

export type RateLimitMethod = "get" | "post" | "put" | "patch" | "delete";
export type RateLimitRouteMethod = Record<RateLimitMethod, string>;
export type RateLimitRoute = { [key: string]: RateLimitHashRoute; (arg: unknown): RateLimitHashRoute };
export type RateLimitHashRoute = RateLimitRouteMethod & RateLimitRoute;
