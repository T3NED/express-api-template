import type { EnvResolver } from "../interface";
import { env } from "./env";

const isValidInteger = (value: string) => Number(value) === parseInt(value);

export const envInteger = ((key: string, required = true, defaultValue?: number): number | undefined => {
	const value = env(key, required, `${defaultValue}`);
	if (typeof value === "undefined") return 0;
	if (!isValidInteger(value)) throw new Error(`Invalid integer environment variable: ${key}`);
	return parseInt(value);
}) as EnvResolver<number>;
