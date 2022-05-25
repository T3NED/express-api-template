import { HttpStatus } from "#constants/http";
import { ApiErrorCode } from "../ApiErrorCode";
import { ApiError } from "../ApiError";

export const InternalServerError = () => {
	return new ApiError()
		.setStatus(HttpStatus.InternalServerError)
		.setCode(ApiErrorCode.InternalServerError)
		.setMessage("Internal Server Error");
};
