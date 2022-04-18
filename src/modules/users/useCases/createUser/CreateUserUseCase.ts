import "reflect-metadata";

import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";

import { hash } from "bcryptjs";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) { }

  async execute({ email, password }: ICreateUserDTO): Promise<void> {
    const emailExists = await this.userRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError("User already exists");
    }

    const hashPassword = await hash(password, 8);

    await this.userRepository.create({ email, password: hashPassword });
  }
}

export { CreateUserUseCase }