import { HttpStatus } from "#constants/http";
import { ApiErrorCode } from "../../ApiErrorCode";
import { ApiError } from "../../ApiError";

export const UnknownRoute = () => {
	return new ApiError()
		.setStatus(HttpStatus.NotFound)
		.setCode(ApiErrorCode.UnknownRoute)
		.setMessage("Unknown Route");
};
