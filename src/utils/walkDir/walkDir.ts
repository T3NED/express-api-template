import { readdir } from "fs/promises";

export async function walkDir(path: string, paths: string[] = []): Promise<string[]> {
	for (const file of await readdir(path, { withFileTypes: true })) {
		if (file.isDirectory()) walkDir(`${path}/${file.name}`, paths);
		else if (file.name.endsWith(".js")) paths.push(`${path}/${file.name}`);
	}

	return paths;
}
