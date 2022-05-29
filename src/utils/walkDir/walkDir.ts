import { readdirSync } from "fs";

export function walkDir(path: string, paths: string[] = []): string[] {
	for (const file of readdirSync(path, { withFileTypes: true })) {
		if (file.isDirectory()) walkDir(`${path}/${file.name}`, paths);
		else if (file.name.endsWith(".js")) paths.push(`${path}/${file.name}`);
	}

	return paths;
}
