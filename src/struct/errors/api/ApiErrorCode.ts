export enum ApiErrorCode {
	// Common
	BadRequest = 0,
	Unauthorized = 0,
	PaymentRequired = 0,
	Forbidden = 0,
	NotFound = 0,
	MethodNotAllowed = 0,
	Conflict = 0,
	UnsupportedMediaType = 0,
	TooManyRequests = 0,
	InternalServerError = 0,
	BadGateway = 0,
	ServiceUnavailable = 0,

	// Client errors
	UnknownRoute = 40_000,
	UnknownUser,

	UsernameInUse = 40_100,

	// Server errors
}
