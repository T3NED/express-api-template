import { ApiError, ApiErrorCode } from "#struct";
import { HttpStatus } from "#constants/http";

export const UnknownUser = () => {
	return new ApiError()
		.setStatus(HttpStatus.NotFound)
		.setCode(ApiErrorCode.UnknownUser)
		.setMessage("Unknown User");
};
