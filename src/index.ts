import "dotenv/config";
import "module-alias/register";

process.on("uncaughtException", (error) => {
	// TODO: update to logger once implemented
	console.error(error);
});

process.on("unhandledRejection", (error) => {
	// TODO: update to logger once implemented
	console.error(error);
});

process.on("SIGINT", () => {
	// TODO: update to logger once implemented
	console.warn("Received SIGINT signal, exiting...");
	process.exit(0);
});
