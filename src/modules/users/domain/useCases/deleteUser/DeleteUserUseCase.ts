import { inject, injectable } from "tsyringe";
import { IDeleteUserDTO } from "../../../infra/dtos/IDeleteUserDTO";
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
      throw new Error("User doesn't exists");
    }

    await this.userRepository.delete({ id });
  }
}

export { DeleteUserUseCase }