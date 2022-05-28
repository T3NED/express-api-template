import { env, envInteger } from "#lib/env";

export const host = env("REDIS_HOST", true);
export const port = envInteger("REDIS_PORT", true);
