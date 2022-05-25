import { env, envInteger } from "#lib/env";

const database = env("POSTGRES_DATABASE", true);
const host = env("POSTGRES_HOST", true);
const port = envInteger("POSTGRES_PORT", true);
const username = env("POSTGRES_USERNAME", true);
const password = env("POSTGRES_PASSWORD", true);

const uri = env("POSTGRES_URI", false, `postgres://${username}:${password}@${host}:${port}/${database}`);

export { database, host, port, username, password, uri };
