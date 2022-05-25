import type { ApiErrorCode } from "./ApiErrorCode";
import type { HttpStatus } from "#constants/http";

export class ApiError extends Error {
	#status?: HttpStatus;
	#code?: ApiErrorCode;
	#message?: string;

	public setStatus(status: HttpStatus): this {
		this.#status = status;
		return this;
	}

	public setCode(code: ApiErrorCode): this {
		this.#code = code;
		return this;
	}

	public setMessage(message: string): this {
		this.#message = message;
		return this;
	}

	public get status(): HttpStatus {
		if (!this.#status) throw new Error("Missing `status` field");
		return this.#status;
	}

	public get code(): ApiErrorCode {
		if (typeof this.#code === "undefined") throw new Error("Missing `code` field");
		return this.#code;
	}

	public get message(): string {
		if (!this.#message) throw new Error("Missing `message` field");
		return this.#message;
	}

	public toJSON(): ApiErrorJson {
		return {
			code: this.code,
			message: this.message,
		};
	}
}

export interface ApiErrorJson {
	code: ApiErrorCode;
	message: string;
}
