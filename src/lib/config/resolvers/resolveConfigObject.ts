import { basename, join } from "path";
import { walkDir } from "#utils";

const configPath = join(process.cwd(), "dist", "config");

export const resolveConfigObject = (): Record<string, unknown> => {
	const configObject: Record<string, unknown> = {};
	const paths = walkDir(configPath);

	for (const path of paths) {
		const fileName = basename(path).replace(/\.\w+$/, "");
		const mod = require(path);
		configObject[fileName] = mod;
	}

	return configObject;
};
