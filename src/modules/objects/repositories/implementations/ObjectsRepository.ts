import { PrismaClient } from "@prisma/client";

import { ICreateObjectDTO } from "../../dtos/ICreateObjectDTO";
import { IObjectRepository } from "../IObjectsRepository";
import { ObjectEntity } from "../../entities/ObjectEntity";
import { IUpdateObjectDTO } from "../../dtos/IUpdateObjectDTO";
import { IDeleteObjectDTO } from "../../dtos/IDeleteObjectDTO";


class ObjectsRepository implements IObjectRepository {
  private prisma = new PrismaClient();

  async create({ width, height, user_id }: ICreateObjectDTO): Promise<ObjectEntity> {
    const object = await this.prisma.objects.create({
      data: {
        width,
        height,
        user_id
      }
    });

    return object;
  }

  async updateImage({ object_id, url }: IUpdateObjectDTO): Promise<void> {
    await this.prisma.objects.update({
      where: { id: object_id },
      data: { image_url: url }
    })
  }

  async delete({ object_id }: IDeleteObjectDTO): Promise<void> {
    await this.prisma.objects.delete({
      where: { id: object_id }
    })
  }

  async getObjects(): Promise<ObjectEntity[]> {
    const objects = await this.prisma.objects.findMany();

    return objects;
  }

  async findById(id: string): Promise<ObjectEntity> {
    const object = await this.prisma.objects.findFirst({
      where: { id }
    })

    return object;
  }
}

export { ObjectsRepository };