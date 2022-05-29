import { ApiError, ApiErrorCode } from "#struct";
import { HttpStatus } from "#constants/http";

export const BadGateway = () => {
	return new ApiError()
		.setStatus(HttpStatus.BadGateway)
		.setCode(ApiErrorCode.BadGateway)
		.setMessage("Bad Gateway");
};
