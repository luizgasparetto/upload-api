import { ICreateObjectDTO } from "../../infra/dtos/ICreateObjectDTO";

interface IObjectRepository {
  create({ width, height, user_id }: ICreateObjectDTO): Promise<void>;
}

export { IObjectRepository }