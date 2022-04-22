import { ICreateObjectDTO } from "../dtos/ICreateObjectDTO";
import { IDeleteObjectDTO } from "../dtos/IDeleteObjectDTO";
import { IUpdateObjectDTO } from "../dtos/IUpdateObjectDTO";
import { ObjectEntity } from "../entities/ObjectEntity";

interface IObjectRepository {
  create({ width, height, user_id }: ICreateObjectDTO): Promise<ObjectEntity>;
  updateImage({ object_id, url }: IUpdateObjectDTO): Promise<void>;
  delete({ object_id }: IDeleteObjectDTO): Promise<void>;
  getObjects(): Promise<ObjectEntity[]>;
  findById(id: string): Promise<ObjectEntity>
}

export { IObjectRepository }