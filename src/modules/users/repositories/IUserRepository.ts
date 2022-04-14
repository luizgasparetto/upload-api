import { UserEntity } from "../entities/UserEntity";

interface IRequest {
  email: string,
  password: string,
};

interface IUserRepository {
  create({ email, password }: IRequest): Promise<void>;
  findByEmail(email: string): Promise<UserEntity>;
};

export { IUserRepository, IRequest };