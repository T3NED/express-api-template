import { resolveConfigObject } from "./resolveConfigObject";
import { extname } from "path";

export const configObject = resolveConfigObject() as ConfigObject;

export const resolveConfig = (configObj: ConfigObject) => {
	const keys: [string, unknown][] = [];

	for (const [key, value] of Object.entries(configObj)) {
		keys.push([key, value]);

		if (typeof configObj[key] === "object") {
			const deeperKeys = resolveConfig(configObj[key] as ConfigObject);

			keys.push(
				...deeperKeys.map((subkey) => {
					const path = `${key}.${subkey[0]}`;
					const pathKey = extname(path).slice(1);
					return [path, Reflect.get(value, pathKey)] as [string, unknown];
				}),
			);
		}
	}

	return keys;
};

export const resolveConfigMap = () => Object.fromEntries(resolveConfig(configObject));

export type ConfigObject = Record<string, Record<string, unknown>>;
