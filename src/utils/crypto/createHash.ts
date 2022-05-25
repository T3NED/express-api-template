import { createHash as _createHash } from "crypto";

export const createHash = (algorithm: string, data: string): string => {
	return _createHash(algorithm).update(data, "utf8").digest("hex");
};
