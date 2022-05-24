import type { EnvResolver } from "../interface";
import { env } from "./env";

const truthy = ["true", "1"];
const falsey = ["false", "0"];

const isValidBoolean = (value: string) => [...truthy, ...falsey].includes(value);

export const envBoolean = ((key: string, required = true, defaultValue?: boolean): boolean | undefined => {
	const value = env(key, required, `${defaultValue}`);
	if (typeof value === "undefined") return undefined;
	if (!isValidBoolean(value)) throw new Error(`Invalid boolean environment variable: ${key}`);
	return truthy.includes(value);
}) as EnvResolver<boolean>;
