import { resolveConfigMap } from "./resolveConfigMap";

export const configMap = resolveConfigMap();

export const config = <T = string>(key: string): T => {
	return configMap[key] as T;
};
