import { env, envInteger } from "./env/resolvers";

const username = env("REDIS_USERAME", true);
const host = env("REDIS_HOST", true);
const port = envInteger("REDIS_PORT", true);

export { username, host, port };
