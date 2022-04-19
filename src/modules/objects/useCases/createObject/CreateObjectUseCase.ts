import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUserRepository } from "../../../users/repositories/IUserRepository";

import { ICreateObjectDTO } from "../../dtos/ICreateObjectDTO";
import { IObjectRepository } from "../../repositories/IObjectsRepository";

@injectable()
class CreateObjectUseCase {
  constructor(
    @inject("ObjectsRepository")
    private objectsRepository: IObjectRepository,
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) { }

  async execute({ width, height, user_id }: ICreateObjectDTO): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError("User doesn't exists");
    }

    await this.objectsRepository.create({ width, height, user_id });
  }
}

export { CreateObjectUseCase };