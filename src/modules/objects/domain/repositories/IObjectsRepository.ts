import { ICreateObjectDTO } from "../../infra/dtos/ICreateObjectDTO";
import { IUpdateObjectDTO } from "../../infra/dtos/IUpdateObjecyDTO";
import { ObjectEntity } from "../entities/ObjectEntity";

interface IObjectRepository {
  create({ width, height, user_id }: ICreateObjectDTO): Promise<void>;
  updateImage({ object_id, image_url }: IUpdateObjectDTO): Promise<void>;
  findById(id: string): Promise<ObjectEntity>
}

export { IObjectRepository }