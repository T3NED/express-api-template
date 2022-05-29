import { ApiError, ApiErrorCode } from "#struct";
import { HttpStatus } from "#constants/http";

export const Forbidden = () => {
	return new ApiError()
		.setStatus(HttpStatus.Forbidden)
		.setCode(ApiErrorCode.Forbidden)
		.setMessage("Forbidden");
};
