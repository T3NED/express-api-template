import { env } from "./env";

const isValidPossible = (possibles: string[], value: string) => possibles.includes(value);

export const envPossibles = (key: string, possibles: string[], defaultValue?: string): string | undefined => {
	const value = env(key, true, defaultValue).toLowerCase();
	if (!isValidPossible(possibles, value))
		throw new Error(`Invalid (${possibles}) environment variable: ${key}`);
	return value;
};
