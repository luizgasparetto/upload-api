import { PrismaClient } from "@prisma/client";

import { ICreateObjectDTO } from "../../dtos/ICreateObjectDTO";
import { IObjectRepository } from "../../domain/repositories/IObjectsRepository";


class ObjectsRepository implements IObjectRepository {
  private prisma = new PrismaClient();

  async create({ width, height, id }: ICreateObjectDTO): Promise<void> {
    await this.prisma.objects.create({
      data: {
        width,
        height,
        user_id: id
      }
    })
  }
}

export { ObjectsRepository };