import { inject, injectable } from "tsyringe";

import { ICreateObjectDTO } from "../../../infra/dtos/ICreateObjectDTO";
import { IObjectRepository } from "../../repositories/IObjectsRepository";

@injectable()
class CreateObjectUseCase {
  constructor(
    @inject("ObjectsRepository")
    private objectsRepository: IObjectRepository
  ) { }

  async execute({ width, height, user_id }: ICreateObjectDTO): Promise<void> {
    await this.objectsRepository.create({ width, height, user_id });
  }
}

export { CreateObjectUseCase };