import { PrismaClient } from "@prisma/client";

import { ICreateObjectDTO } from "../dtos/ICreateObjectDTO";
import { IObjectRepository } from "../../domain/repositories/IObjectsRepository";
import { ObjectEntity } from "../../domain/entities/ObjectEntity";
import { IUpdateObjectDTO } from "../dtos/IUpdateObjecyDTO";


class ObjectsRepository implements IObjectRepository {
  private prisma = new PrismaClient();

  async create({ width, height, user_id }: ICreateObjectDTO): Promise<void> {
    await this.prisma.objects.create({
      data: {
        width,
        height,
        user_id
      }
    })
  }

  async updateImage({ object_id, image_url }: IUpdateObjectDTO): Promise<void> {
    await this.prisma.objects.update({
      where: { id: object_id },
      data: { image_url }
    })
  }

  async findById(id: string): Promise<ObjectEntity> {
    const object = await this.prisma.objects.findFirst({
      where: { id }
    })

    return object;
  }
}

export { ObjectsRepository };