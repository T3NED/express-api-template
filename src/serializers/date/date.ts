import type { Serializer } from "#lib/serializer";
import { implement } from "#utils";

@implement<Serializer<string, Date>>()
export class DateSerializer {
	public static serialize(data: Date): string {
		return data.toISOString();
	}

	public static deserialize(data: string): Date {
		return new Date(data);
	}
}
