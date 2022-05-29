import { ApiError, ApiErrorCode } from "#struct";
import { HttpStatus } from "#constants/http";

export const PaymentRequired = () => {
	return new ApiError()
		.setStatus(HttpStatus.PaymentRequired)
		.setCode(ApiErrorCode.PaymentRequired)
		.setMessage("Payment Required");
};
