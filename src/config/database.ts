import { env, envInteger } from "./env/resolvers";

const database = env("POSTGRES_DATABASE", true);
const username = env("POSTGRES_USERAME", true);
const password = env("POSTGRES_PASSWORD", true);
const host = env("POSTGRES_HOST", true);
const port = envInteger("POSTGRES_PORT", true);

const uri = env("POSTGRES_URI", false, `postgres://${username}:${password}@${host}:${port}/${database}`);

export { database, username, password, host, port, uri };
