import "reflect-metadata";

import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";

import { hash } from "bcryptjs";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { AppError } from "../../../../shared/errors/AppError";
import { UserEntity } from "../../entities/UserEntity";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) { }

  async execute({ name, email, password }: ICreateUserDTO): Promise<UserEntity> {
    const emailExists = await this.userRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError("User already exists");
    }

    const hashPassword = await hash(password, 8);

    const user = await this.userRepository.create({ name, email, password: hashPassword });

    return user;
  }
}

export { CreateUserUseCase }