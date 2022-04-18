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
    return await this.objectsRepository.getObjects();
  }
}

export { GetObjectUseCase };