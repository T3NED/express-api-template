export class Snowflake {
	#epoch: bigint;
	#increment = 0n;

	public constructor(epoch: BigIntResolvable) {
		this.#epoch = Snowflake.resolveBigInt(epoch);
	}

	public static resolveBigInt(value: BigIntResolvable): bigint {
		return BigInt(value instanceof Date ? value.getTime() : value);
	}

	public generate(options: Partial<GenerateSnowflakeOptions> = {}): bigint {
		const workerId = options.workerId ?? 0n;
		const processId = options.processId ?? 0n;
		const timestamp = Snowflake.resolveBigInt(options.timestamp ?? Date.now());

		let increment = options.increment;
		if (typeof increment === "bigint" && increment >= 4095n) {
			increment = 0n;
		} else {
			increment = this.#increment++;
			if (this.#increment >= 4095n) this.#increment = 0n;
		}

		return (
			((timestamp - this.#epoch) << 22n) |
			((workerId & 0b11111n) << 17n) |
			((processId & 0b11111n) << 12n) |
			increment
		);
	}

	public deconstruct(snowflake: bigint): DeconstructedSnowflake {
		return {
			timestamp: (snowflake >> 22n) + this.#epoch,
			workerId: (snowflake >> 17n) & 0b11111n,
			processId: (snowflake >> 12n) & 0b11111n,
			increment: snowflake & 0b111111111111n,
			epoch: this.#epoch,
		};
	}

	public timestampFrom(snowflake: bigint): Date {
		return new Date(Number((BigInt(snowflake) >> 22n) + this.#epoch));
	}
}

export type BigIntResolvable = number | bigint | Date;

export interface GenerateSnowflakeOptions {
	workerId: bigint;
	processId: bigint;
	increment: bigint;
	timestamp: BigIntResolvable;
}

export interface DeconstructedSnowflake {
	epoch: bigint;
	workerId: bigint;
	processId: bigint;
	increment: bigint;
	timestamp: bigint;
}
