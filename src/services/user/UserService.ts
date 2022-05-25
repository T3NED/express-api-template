import type { User } from "@prisma/client";
import { ServiceSnowflake } from "#utils";
import { Database } from "#providers";

export class UserService {
	public static async create(data: CreateUserData): Promise<User> {
		return Database.get().user.create({
			data: {
				id: ServiceSnowflake.generate(),
				username: data.username,
			},
		});
	}

	public static update(id: bigint, data: UpdateUserData): Promise<User> {
		return Database.get().user.update({
			where: {
				id,
			},
			data: {
				username: data.username,
				bio: data.bio,
			},
		});
	}

	public static delete(id: bigint): Promise<User> {
		return Database.get().user.delete({
			where: {
				id,
			},
		});
	}

	public static getById(id: bigint): Promise<User | null> {
		return Database.get().user.findUnique({
			where: {
				id,
			},
		});
	}

	public static getByUsername(username: string): Promise<User | null> {
		return Database.get().user.findUnique({
			where: {
				username,
			},
		});
	}

	public static searchByUsername(username: string, data: SearchUserData = {}): Promise<User[]> {
		return Database.get().user.findMany({
			where: {
				username: {
					startsWith: username,
				},
				id: {
					lt: data.before,
					gt: data.after,
				},
			},
			orderBy: {
				_relevance: {
					fields: "username",
					search: username,
					sort: "asc",
				},
			},
			take: data.limit,
		});
	}
}

export interface CreateUserData {
	username: string;
}

export interface UpdateUserData {
	username?: string;
	bio?: string;
}

export interface SearchUserData {
	before?: bigint;
	after?: bigint;
	limit?: number;
}
