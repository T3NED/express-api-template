import { environment } from "#config/app";

export enum AppEnv {
	Production = "production",
	Development = "development",
	Staging = "staging",
	Local = "local",
}

export const is = {
	production: AppEnv.Production === environment,
	development: AppEnv.Development === environment,
	staging: AppEnv.Staging === environment,
	local: AppEnv.Local === environment,
};

export const environments = [AppEnv.Production, AppEnv.Development, AppEnv.Staging, AppEnv.Local];
