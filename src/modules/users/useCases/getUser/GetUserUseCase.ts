import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { UserEntity } from "../../entities/UserEntity";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
class GetUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) { }

  async execute(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("User doesn't exists");
    }

    return user;
  }
}

export { GetUserUseCase }