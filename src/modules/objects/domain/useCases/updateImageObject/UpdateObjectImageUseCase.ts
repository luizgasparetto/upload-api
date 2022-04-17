import { AppConfig } from "aws-sdk";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../../shared/infra/errors/AppError";
import { IObjectRepository } from "../../repositories/IObjectsRepository";

@injectable()
class UpdateImageObjectUseCase {
  constructor(
    @inject("ObjectsRepository")
    private objectsRepository: IObjectRepository
  ) { }

  async execute({ object_id, url }): Promise<void> {
    const objectExists = await this.objectsRepository.findById(object_id);

    if (!objectExists) {
      throw new AppError("Object doesn't exists");
    }

    await this.objectsRepository.updateImage({ object_id, image_url: url });
  }
}

export { UpdateImageObjectUseCase };