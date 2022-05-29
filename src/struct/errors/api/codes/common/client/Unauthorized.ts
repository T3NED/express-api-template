import { ApiError, ApiErrorCode } from "#struct";
import { HttpStatus } from "#constants/http";

export const Unauthorized = () => {
	return new ApiError()
		.setStatus(HttpStatus.Unauthorized)
		.setCode(ApiErrorCode.Unauthorized)
		.setMessage("Unauthorized");
};
