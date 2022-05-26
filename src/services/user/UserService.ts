import type { User } from "@prisma/client";

import { UsernameAlreadyInUseError } from "#struct";
import { Database } from "#providers";
import { ServiceSnowflake } from "#utils";

export class UserService {
	public static async create(data: CreateUserData): Promise<User> {
		await this._checkUniqueUsername(data.username);

		return Database.get().user.create({
			data: {
				id: ServiceSnowflake.generate(),
				username: data.username,
			},
		});
	}

	public static async update(id: bigint, data: UpdateUserData): Promise<User> {
		if (data.username) {
			await this._checkUniqueUsername(data.username, id);
		}

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

	private static async _checkUniqueUsername(username: string, userId?: bigint): Promise<void> {
		const existingUserWithUsername = await this.getByUsername(username);

		if (!existingUserWithUsername) return;
		if (userId && existingUserWithUsername.id === userId) return;

		throw UsernameAlreadyInUseError();
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
