import { env, envInteger, envPossibles } from "./env/resolvers";

const name = env("APP_NAME", true);
const port = envInteger("APP_PORT", true, 3000);
const environment = envPossibles("APP_ENV", ["production", "development", "staging", "local"], "local");

export { name, port, environment };
