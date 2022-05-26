import "dotenv/config";
import "module-alias/register";
import "reflect-metadata";

import { Logger } from "#utils";

process.on("uncaughtException", (error) => {
	Logger.error(error?.message, {
		error: {
			message: error.message,
			stack: error.stack,
		},
	});
});

process.on("unhandledRejection", (error: Error) => {
	Logger.error(error?.message, {
		error: {
			message: error.message,
			stack: error.stack,
		},
	});
});

process.on("SIGINT", () => {
	Logger.warn("Received SIGINT signal, exiting...");
	process.exit(0);
});
