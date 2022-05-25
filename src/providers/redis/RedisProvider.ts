import RedisClient, { Redis } from "ioredis";
import { username, host, port } from "#config/redis";
import { Logger } from "#utils";

export class RedisProvider {
	static #instance: RedisProvider;
	#client: Redis;

	public constructor() {
		if (RedisProvider.#instance) throw new Error("RedisProvider is a singleton");

		const client = new RedisClient({
			username,
			host,
			port,
		});

		client.on("connect", () => Logger.info("Connected to redis"));
		client.on("error", (error) => Logger.error(error));

		this.#client = client;
	}

	public static get(): Redis {
		if (!RedisProvider.#instance) RedisProvider.#instance = new RedisProvider();
		return RedisProvider.#instance.#client;
	}
}
