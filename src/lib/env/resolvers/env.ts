import type { EnvResolver } from "../interface";

export const env = ((key: string, required = true, defaultValue?: string): string | undefined => {
	const value = process.env[key] ?? defaultValue;
	if (required && !value) throw new Error(`Missing environment variable: ${key}`);
	return value;
}) as EnvResolver<string>;
