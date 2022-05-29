import { ApiError, ApiErrorCode } from "#struct";
import { HttpStatus } from "#constants/http";

export const NotFound = () => {
	return new ApiError()
		.setStatus(HttpStatus.NotFound)
		.setCode(ApiErrorCode.NotFound)
		.setMessage("Not Found");
};
