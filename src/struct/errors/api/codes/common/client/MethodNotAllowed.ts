import { ApiError, ApiErrorCode } from "#struct";
import { HttpStatus } from "#constants/http";

export const MethodNotAllowed = () => {
	return new ApiError()
		.setStatus(HttpStatus.MethodNotAllowed)
		.setCode(ApiErrorCode.MethodNotAllowed)
		.setMessage("Method Not Allowed");
};
