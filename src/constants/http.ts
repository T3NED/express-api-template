export enum HttpStatus {
	// Success
	Ok = 200,
	Created,
	NoContent = 204,
	PartialContent,

	// Redirectional
	Found = 302,

	// Client errors
	BadRequest = 400,
	Unauthorized,
	Forbidden = 403,
	NotFound,
	MethodNotAllowed,
	NotAcceptable,
	Conflict = 409,
	UnsupportedMediaType = 415,
	TooManyRequests = 429,

	// Server errors
	InternalServerError = 500,
	BadGateway = 502,
	ServiceUnavailable,
	GatewayTimeout,
}

export enum HttpHeader {
	RateLimitBucket = "X-RateLimit-Bucket",
	RateLimitLimit = "X-RateLimit-Limit",
	RateLimitRemaining = "X-RateLimit-Remaining",
	RateLimitReset = "X-RateLimit-Reset",
	RateLimitRetryAfter = "X-RateLimit-RetryAfter",

	RealIp = "X-Real-IP",
}
