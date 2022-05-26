import { HttpStatus } from "#constants/http";
import { ApiError, ApiErrorCode } from "#struct";

export const UsernameAlreadyInUseError = () => {
	return new ApiError()
		.setStatus(HttpStatus.BadRequest)
		.setCode(ApiErrorCode.UsernameInUse)
		.setMessage("Username is already in use.");
};
