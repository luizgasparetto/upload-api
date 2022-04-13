import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";

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

    await this.userRepository.create({ email, password });
  }
}

export { CreateUserUseCase }