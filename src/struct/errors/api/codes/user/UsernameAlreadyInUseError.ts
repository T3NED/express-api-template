import { HttpStatus } from "#constants/http";
import { ApiError, ApiErrorCode } from "#struct";

export const UsernameAlreadyInUseError = new ApiError()
	.setStatus(HttpStatus.BadRequest)
	.setCode(ApiErrorCode.UsernameInUse)
	.setMessage("Username is already in use.");
