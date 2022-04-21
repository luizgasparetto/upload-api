import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IDeleteUserDTO } from "../dtos/IDeleteUserDTO";
import { UserEntity } from "../entities/UserEntity";

interface IUserRepository {
  create({ email, password }: ICreateUserDTO): Promise<UserEntity>;
  delete({ id }: IDeleteUserDTO): Promise<void>;
  findByEmail(email: string): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity>;
};

export { IUserRepository };