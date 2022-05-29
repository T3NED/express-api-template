import { PrismaClient } from "@prisma/client";
import { config } from "#lib/config";
import { is } from "#constants/app";
import { Logger } from "#utils";

import * as middleware from "./middleware";

export class DatabaseProvider {
	static #instance: DatabaseProvider;
	#client: PrismaClient;

	public constructor() {
		if (DatabaseProvider.#instance) throw new Error("DatabaseProvider is a singleton");

		const client = new PrismaClient({
			datasources: {
				db: {
					url: config("database.uri"),
				},
			},
			errorFormat: "pretty",
			rejectOnNotFound: {
				findFirst: false,
				findUnique: false,
			},
			log: [
				{ level: "info", emit: "event" },
				{ level: "error", emit: "event" },
				{ level: "warn", emit: "event" },
			],
		});

		if (is.development) client.$use(middleware.queryTime);
		client.$on("info", (data) => Logger.info(data.message));
		client.$on("warn", (data) => Logger.warn(data.message));
		client.$on("error", (data) => Logger.error(data.message));

		this.#client = client;
	}

	public static get(): PrismaClient {
		if (!DatabaseProvider.#instance) DatabaseProvider.#instance = new DatabaseProvider();
		return DatabaseProvider.#instance.#client;
	}
}
