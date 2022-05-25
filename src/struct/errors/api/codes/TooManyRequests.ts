import { HttpStatus } from "#constants/http";
import { ApiErrorCode } from "../ApiErrorCode";
import { ApiError } from "../ApiError";

export const TooManyRequests = () => {
	return new ApiError() //
		.setStatus(HttpStatus.TooManyRequests)
		.setCode(ApiErrorCode.TooManyRequests)
		.setMessage("Too Many Requests");
};
