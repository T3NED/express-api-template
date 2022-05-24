import { env, envInteger, envPossibles } from "./env/resolvers";

export = {
	name: env("APP_NAME", true),
	port: envInteger("APP_PORT", false, 3000),
	env: envPossibles("APP_ENV", ["production", "development", "staging", "local"], "local"),
};
