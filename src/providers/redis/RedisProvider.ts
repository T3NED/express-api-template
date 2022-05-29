import RedisClient, { Redis } from "ioredis";
import { config } from "#lib/config";
import { Logger } from "#utils";

export class RedisProvider {
	static #instance: RedisProvider;
	#client: Redis;

	public constructor() {
		if (RedisProvider.#instance) throw new Error("RedisProvider is a singleton");

		const client = new RedisClient({
			host: config("redis.host"),
			port: config("redis.port"),
		});

		client.on("connect", () => Logger.info("Connected to redis"));
		client.on("error", (error) =>
			Logger.error(error, {
				error: {
					message: error?.message,
					stack: error?.stack,
				},
			}),
		);

		this.#client = client;
	}

	public static get(): Redis {
		if (!RedisProvider.#instance) RedisProvider.#instance = new RedisProvider();
		return RedisProvider.#instance.#client;
	}
}
