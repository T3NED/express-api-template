import { env, envInteger } from "#lib/env";

export const database = env("POSTGRES_DATABASE", true);
export const host = env("POSTGRES_HOST", true);
export const port = envInteger("POSTGRES_PORT", true);
export const username = env("POSTGRES_USERNAME", true);
export const password = env("POSTGRES_PASSWORD", true);

export const uri = `postgres://${username}:${password}@${host}:${port}/${database}`;
