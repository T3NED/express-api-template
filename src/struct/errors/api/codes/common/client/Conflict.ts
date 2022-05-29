import { ApiError, ApiErrorCode } from "#struct";
import { HttpStatus } from "#constants/http";

export const Conflict = () => {
	return new ApiError()
		.setStatus(HttpStatus.Conflict)
		.setCode(ApiErrorCode.Conflict)
		.setMessage("Conflict");
};
