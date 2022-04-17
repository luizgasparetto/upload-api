import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IDeleteUserDTO } from "../../dtos/IDeleteUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) { }

  async execute({ id }: IDeleteUserDTO): Promise<void> {
    const userExists = await this.userRepository.findById(id);

    if (!userExists) {
      throw new AppError("User doesn't exists");
    }

    await this.userRepository.delete({ id });
  }
}

export { DeleteUserUseCase }