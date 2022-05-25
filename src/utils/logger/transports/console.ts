import { LogLevel } from "#constants/logger";
import { format, transports } from "winston";

const { colorize } = format.colorize();

const timestampFormat = format.timestamp({
	format: "DD/MM/YYYY @ HH:mm:ss",
});

const consoleFormat = format.printf((info) => {
	const isError = info.level === "error";
	const message = isError
		? info.error?.stack ?? info.error?.message ?? info.error ?? info.message
		: info.message;

	const timestamp = colorize("timestamp", `[${info.timestamp}]`);
	const level = `[${colorize(`${info.level}BG`, info.level.toUpperCase())}]`;
	const content = colorize(info.level, message);

	return `${timestamp} ${level} ${content}`;
});

export const consoleTransport = new transports.Console({
	format: format.combine(timestampFormat, consoleFormat),
	level: LogLevel.Debug,
});
