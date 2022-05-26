export enum ApiErrorCode {
	// Common errors
	BadRequest = 0,
	Unauthorized = 0,
	TooManyRequests = 0,
	InternalServerError = 0,

	// Unknown resources
	UnknownRoute = 40_000,

	// Server validation errors
	UsernameInUse = 50_001,
}
