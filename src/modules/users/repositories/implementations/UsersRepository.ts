import { getRepository, IsNull, Repository } from "typeorm";
import { Game } from "../../../games/entities/Game";

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from "../../dtos";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
	private repository: Repository<User>;

	constructor() {
		this.repository = getRepository(User);
	}

	async findUserWithGamesById({
		user_id,
	}: IFindUserWithGamesDTO): Promise<User> {
		return this.repository.findOneOrFail({
			relations: ["games"],
			where: {
				id: user_id,
			},
		});
	}

	async findAllUsersOrderedByFirstName(): Promise<User[]> {
		return this.repository.query("SELECT * FROM users ORDER BY first_name ASC"); // Complete usando raw query
	}

	async findUserByFullName({
		first_name,
		last_name,
	}: IFindUserByFullNameDTO): Promise<User[] | undefined> {
		return this.repository.query(
			"SELECT * FROM users WHERE first_name ILIKE $1 AND last_name ILIKE $2",
			[first_name, last_name],
		); // Complete usando raw query
	}
}
