import { ApiError, ApiErrorCode } from "#struct";
import { HttpStatus } from "#constants/http";

export const InternalServerError = () => {
	return new ApiError()
		.setStatus(HttpStatus.InternalServerError)
		.setCode(ApiErrorCode.InternalServerError)
		.setMessage("Internal Server Error");
};
