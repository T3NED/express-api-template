import RedisClient, { Redis } from "ioredis";
import { Logger } from "#utils";

export class RedisProvider {
	static #instance: RedisProvider;
	#client: Redis;

	public constructor() {
		if (RedisProvider.#instance) throw new Error("RedisProvider is a singleton");

		const client = new RedisClient(process.env.REDIS_URI as string);

		client.on("connect", () => Logger.info("Connected to redis"));
		client.on("error", (error) => Logger.error(error));

		this.#client = client;
	}

	public static get(): Redis {
		if (!RedisProvider.#instance) RedisProvider.#instance = new RedisProvider();
		return RedisProvider.#instance.#client;
	}
}
