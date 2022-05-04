import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUserRepository } from "../../../users/repositories/IUserRepository";

import { ICreateObjectDTO } from "../../dtos/ICreateObjectDTO";
import { IObjectRepository } from "../../repositories/IObjectsRepository";

// url, filename, user_id
@injectable()
class CreateObjectUseCase {
  constructor(
    @inject("ObjectsRepository")
    private objectsRepository: IObjectRepository,
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) { }

  async execute({ url, filename, user_id }: ICreateObjectDTO): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError("User doesn't exists");
    }

    if (!url) {
      url = `http://localhost:3333/files/${filename}`;
    }

    await this.objectsRepository.create({ url, filename, user_id });
  }
}

export { CreateObjectUseCase };