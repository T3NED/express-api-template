import type { User } from "@prisma/client";

import { SnowflakeSerializer, DateSerializer } from "#serializers";
import { ServiceSnowflake } from "#utils";

export class UserMapper {
	public static map(user: User): MappedUser {
		const createdAt = ServiceSnowflake.timestampFrom(user.id);

		return {
			id: SnowflakeSerializer.serialize(user.id),
			username: user.username,
			bio: user.bio,
			created_at: DateSerializer.serialize(createdAt),
		};
	}
}

export interface MappedUser {
	id: string;
	username: string;
	bio: string | null;
	created_at: string;
}
