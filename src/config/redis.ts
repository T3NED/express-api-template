import { env, envInteger } from "./env/resolvers";

const database = env("REDIS_DATABASE");
const username = env("REDIS_USERAME", true);
const host = env("REDIS_HOST", true);
const port = envInteger("REDIS_PORT", true);

export { database, username, host, port };
