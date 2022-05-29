import { ApiError, ApiErrorCode } from "#struct";
import { HttpStatus } from "#constants/http";

export const UnsupportedMediaType = () => {
	return new ApiError()
		.setStatus(HttpStatus.UnsupportedMediaType)
		.setCode(ApiErrorCode.UnsupportedMediaType)
		.setMessage("Unsupported Media Type");
};
