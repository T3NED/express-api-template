import { env, envInteger, envPossibles } from "./env/resolvers";
import { environments } from "#constants/app";

const name = env("APP_NAME", true);
const port = envInteger("APP_PORT", true, 3000);
const environment = envPossibles("APP_ENV", environments, "local");

export { name, port, environment };
