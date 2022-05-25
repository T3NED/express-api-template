import { createHash } from "./createHash";

export const sha1 = (data: string): string => createHash("sha1", data);
