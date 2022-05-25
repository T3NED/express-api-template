import { HttpStatus } from "#constants/http";
import { ApiErrorCode } from "../ApiErrorCode";
import { ApiError } from "../ApiError";

export const BadRequest = () => {
	return new ApiError() //
		.setStatus(HttpStatus.BadRequest)
		.setCode(ApiErrorCode.BadRequest);
};
