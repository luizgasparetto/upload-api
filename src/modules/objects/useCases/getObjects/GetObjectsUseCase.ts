import { inject, injectable } from "tsyringe";
import { ObjectEntity } from "../../entities/ObjectEntity";
import { IObjectRepository } from "../../repositories/IObjectsRepository";

@injectable()
class GetObjectUseCase {
  constructor(
    @inject("ObjectsRepository")
    private objectsRepository: IObjectRepository
  ) { }

  async execute(): Promise<ObjectEntity[]> {
    const objects = await this.objectsRepository.getObjects();

    return objects;
  }
}

export { GetObjectUseCase };