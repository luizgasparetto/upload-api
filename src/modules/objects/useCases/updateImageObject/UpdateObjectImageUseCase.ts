import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUpdateObjectDTO } from "../../dtos/IUpdateObjectDTO";
import { IObjectRepository } from "../../repositories/IObjectsRepository";

@injectable()
class UpdateObjectImageUseCase {
  constructor(
    @inject("ObjectsRepository")
    private objectsRepository: IObjectRepository
  ) { }

  async execute({ object_id, url, filename, user_id }: IUpdateObjectDTO): Promise<void> {
    const objectExists = await this.objectsRepository.findById(object_id);

    if (!objectExists) {
      throw new AppError("Object doesn't exists");
    }

    if (objectExists.user_id != user_id) {
      throw new AppError("You haven't created this object", 403);
    }

    if (!url) {
      url = `http://localhost:3333/files/${filename}`;
    }

    await this.objectsRepository.updateImage({ object_id, url });
  }
}

export { UpdateObjectImageUseCase };