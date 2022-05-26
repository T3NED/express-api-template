import { HttpStatus } from "#constants/http";
import { ApiErrorCode } from "../../ApiErrorCode";
import { ApiError } from "../../ApiError";

export const UnknownUser = () => {
	return new ApiError()
		.setStatus(HttpStatus.NotFound)
		.setCode(ApiErrorCode.UnknownUser)
		.setMessage("Unknown User");
};
