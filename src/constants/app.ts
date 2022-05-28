export enum AppEnv {
	Production = "production",
	Development = "development",
	Staging = "staging",
	Local = "local",
}

export const is = {
	production: AppEnv.Production === process.env.APP_ENV,
	development: AppEnv.Development === process.env.APP_ENV,
	staging: AppEnv.Staging === process.env.APP_ENV,
	local: AppEnv.Local === process.env.APP_ENV,
};

export const environments = [AppEnv.Production, AppEnv.Development, AppEnv.Staging, AppEnv.Local];
