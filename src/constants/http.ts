export enum HttpStatus {
	// Success
	Ok = 200,
	Created,
	Accepted,
	NoContent = 204,
	ResetContent,
	PartialContent,

	// Redirectional
	MovedPermanently = 301,
	Found,
	NotModified = 304,
	TemporaryRedirect = 307,
	PermanentRedirect,

	// Client errors
	BadRequest = 400,
	Unauthorized,
	PaymentRequired,
	Forbidden,
	NotFound,
	MethodNotAllowed,
	Conflict = 409,
	UnsupportedMediaType = 415,
	TooManyRequests = 429,

	// Server errors
	InternalServerError = 500,
	BadGateway = 502,
	ServiceUnavailable,
}

export enum HttpHeader {
	RateLimitBucket = "X-RateLimit-Bucket",
	RateLimitLimit = "X-RateLimit-Limit",
	RateLimitRemaining = "X-RateLimit-Remaining",
	RateLimitReset = "X-RateLimit-Reset",
	RateLimitRetryAfter = "X-RateLimit-RetryAfter",

	RealIp = "X-Real-IP",
}
