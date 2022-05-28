import { env, envInteger, envPossibles } from "#lib/env";
import { environments } from "#constants/app";

export const name = env("APP_NAME", true);
export const port = envInteger("APP_PORT", true, 3000);
export const environment = envPossibles("APP_ENV", environments, "local");
