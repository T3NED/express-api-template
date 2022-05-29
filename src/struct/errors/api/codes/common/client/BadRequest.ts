import { ApiError, ApiErrorCode } from "#struct";
import { HttpStatus } from "#constants/http";

export const BadRequest = () => {
	return new ApiError()
		.setStatus(HttpStatus.BadRequest)
		.setCode(ApiErrorCode.BadRequest)
		.setMessage("Bad Request");
};
