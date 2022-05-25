import type { Serializer } from "#lib/serializer";
import { implement } from "#utils";

@implement<Serializer<string, bigint>>()
export class SnowflakeSerializer {
	public static serialize(data: bigint): string {
		return data.toString();
	}

	public static deserialize(data: string): bigint {
		return BigInt(data);
	}
}
