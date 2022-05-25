import type { AbstractConfigSetColors } from "winston/lib/winston/config";

export enum LogLevel {
	Error = "error",
	Warn = "warn",
	Info = "info",
	Verbose = "verbose",
	Debug = "debug",
}

export enum LogLevelSeverity {
	Error,
	Warn,
	Info,
	Verbose,
	Debug,
}

export const logLevels = {
	[LogLevel.Error]: LogLevelSeverity.Error,
	[LogLevel.Warn]: LogLevelSeverity.Warn,
	[LogLevel.Info]: LogLevelSeverity.Info,
	[LogLevel.Verbose]: LogLevelSeverity.Verbose,
	[LogLevel.Debug]: LogLevelSeverity.Debug,
};

const logLevelColors: AbstractConfigSetColors = {
	[LogLevel.Error]: "red",
	[LogLevel.Warn]: "yellow",
	[LogLevel.Info]: "blue",
	[LogLevel.Verbose]: "green",
	[LogLevel.Debug]: "grey",
};

const logLevelBackgroundColors: AbstractConfigSetColors = Object.entries(logLevelColors).reduce(
	(prev, [name, color]) => {
		prev[`${name}BG`] = `bold ${color}`;
		return prev;
	},
	{} as AbstractConfigSetColors,
);

const logAttributeColors: AbstractConfigSetColors = {
	timestamp: "bold grey",
};

export const colors: AbstractConfigSetColors = {
	...logLevelColors,
	...logLevelBackgroundColors,
	...logAttributeColors,
};
