import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IDeleteUserDTO } from "../../dtos/IDeleteUserDTO";
import { UserEntity } from "../../entities/UserEntity";
import { IUserRepository } from "../IUserRepository";

class UserRepositoryInMemory implements IUserRepository {
  public users: UserEntity[] = [];

  async create({ email, password }: ICreateUserDTO): Promise<UserEntity> {
    const user = new UserEntity();

    Object.assign(user, { email, password });

    this.users.push(user);

    return user;
  }

  async delete({ id }: IDeleteUserDTO): Promise<void> {
    const userIndex = this.users.findIndex(user => user.id === id);

    this.users.splice(userIndex, 1);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.users.find(user => user.email == email);
  }

  async findById(id: string): Promise<UserEntity> {
    return this.users.find(user => user.id === id);
  }
}

export { UserRepositoryInMemory };