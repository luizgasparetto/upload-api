import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";

import { hash } from "bcryptjs";

interface IRequest {
  email: string,
  password: string,
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<void> {
    const emailExists = await this.userRepository.findByEmail(email);

    if (emailExists) {
      throw new Error("User already exists");
    }

    const hashPassword = await hash(password, 8);

    await this.userRepository.create({ email, password: hashPassword });
  }
}

export { CreateUserUseCase }