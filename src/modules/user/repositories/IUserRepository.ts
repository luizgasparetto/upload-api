import { User } from "@prisma/client";

interface IRequest {
  email: string,
  password: string,
};

interface IUserRepository {
  create({ email, password }: IRequest): Promise<void>;
  findByEmail(email: string): Promise<User>;
};

export { IUserRepository, IRequest };