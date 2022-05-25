import { env, envInteger } from "#lib/env";

const host = env("REDIS_HOST", true);
const port = envInteger("REDIS_PORT", true);
const username = env("REDIS_USERNAME", false);

export { username, host, port };
