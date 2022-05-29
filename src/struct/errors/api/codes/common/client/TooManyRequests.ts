import { ApiError, ApiErrorCode } from "#struct";
import { HttpStatus } from "#constants/http";

export const TooManyRequests = () => {
	return new ApiError()
		.setStatus(HttpStatus.TooManyRequests)
		.setCode(ApiErrorCode.TooManyRequests)
		.setMessage("Too Many Requests");
};
