import { ICreateObjectDTO } from "../../dtos/ICreateObjectDTO";

interface IObjectRepository {
  create({width, height, id}: ICreateObjectDTO): Promise<void>;
}

export { IObjectRepository }