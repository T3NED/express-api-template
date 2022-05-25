import { consoleTransport } from "./transports/console";
import { colors, logLevels } from "#constants/logger";
import { createLogger, addColors } from "winston";

addColors(colors);

export const Logger = createLogger({ levels: logLevels }) //
	.add(consoleTransport);
