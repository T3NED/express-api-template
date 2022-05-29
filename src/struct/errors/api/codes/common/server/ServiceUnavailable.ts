import { ApiError, ApiErrorCode } from "#struct";
import { HttpStatus } from "#constants/http";

export const ServiceUnavailable = () => {
	return new ApiError()
		.setStatus(HttpStatus.ServiceUnavailable)
		.setCode(ApiErrorCode.ServiceUnavailable)
		.setMessage("Service Unavailable");
};
