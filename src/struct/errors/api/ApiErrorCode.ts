export enum ApiErrorCode {
	// User errors
	BadRequest = 0,
	Unauthorized = 0,
	TooManyRequests = 0,

	// Unknown resources
	UnknownRoute = 40_000,

	// Server errors
	InternalServerError = 0,
}
