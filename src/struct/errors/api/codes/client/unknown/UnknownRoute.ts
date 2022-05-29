import { ApiError, ApiErrorCode } from "#struct";
import { HttpStatus } from "#constants/http";

export const UnknownRoute = () => {
	return new ApiError()
		.setStatus(HttpStatus.NotFound)
		.setCode(ApiErrorCode.UnknownRoute)
		.setMessage("Unknown Route");
};
