import { PrismaClient } from "@prisma/client";
import { AppEnv } from "#constants/app";
import { uri } from "#config/database";
import { Logger } from "#utils";

export class DatabaseProvider {
	static #instance: DatabaseProvider;
	#client: PrismaClient;

	public constructor() {
		if (DatabaseProvider.#instance) throw new Error("DatabaseProvider is a singleton");

		const client = new PrismaClient({
			datasources: {
				db: {
					url: uri,
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

		if (process.env.APP_ENV === AppEnv.Development) {
			client.$use(async (params, next) => {
				const startTime = performance.now();
				const result = await next(params);
				const timeTook = performance.now() - startTime;

				Logger.info(`Query ${params.model}.${params.action} took ${timeTook}ms`);

				return result;
			});
		}

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
