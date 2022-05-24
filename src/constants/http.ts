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

	// Server errors
	InternalServerError = 500,
	BadGateway = 502,
	ServiceUnavailable,
	GatewayTimeout,
}
