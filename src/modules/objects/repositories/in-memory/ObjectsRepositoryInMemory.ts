import { ICreateObjectDTO } from "../../dtos/ICreateObjectDTO";
import { IDeleteObjectDTO } from "../../dtos/IDeleteObjectDTO";
import { IUpdateObjectDTO } from "../../dtos/IUpdateObjectDTO";
import { ObjectEntity } from "../../entities/ObjectEntity";
import { IObjectRepository } from "../IObjectsRepository";

class ObjectsRepositoryInMemory implements IObjectRepository {
  public objects: ObjectEntity[] = [];

  async create({ width, height, user_id }: ICreateObjectDTO): Promise<ObjectEntity> {
    const object = new ObjectEntity();

    Object.assign(object, {
      width,
      height,
      user_id
    });

    this.objects.push(object);

    return object;
  }

  async updateImage({ object_id, url }: IUpdateObjectDTO): Promise<void> {
    const object = await this.findById(object_id);

    object.image_url = url;
  }

  async delete({ object_id }: IDeleteObjectDTO): Promise<void> {
    const objectIndex = this.objects.findIndex(object => object.id === object_id);

    this.objects.splice(objectIndex, 1);
  }

  async getObjects(): Promise<ObjectEntity[]> {
    return this.objects;
  }

  async findById(id: string): Promise<ObjectEntity> {
    return this.objects.find(object => object.id === id);
  }
}

export { ObjectsRepositoryInMemory };