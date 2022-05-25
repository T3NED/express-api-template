import { env, envInteger } from "#lib/env";

const username = env("REDIS_USERNAME", true);
const host = env("REDIS_HOST", true);
const port = envInteger("REDIS_PORT", true);

export { username, host, port };
