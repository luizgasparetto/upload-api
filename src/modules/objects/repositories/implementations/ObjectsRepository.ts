import { PrismaClient } from "@prisma/client";

import { ICreateObjectDTO } from "../../dtos/ICreateObjectDTO";
import { IObjectRepository } from "../IObjectsRepository";
import { ObjectEntity } from "../../entities/ObjectEntity";
import { IUpdateObjectDTO } from "../../dtos/IUpdateObjectDTO";
import { IDeleteObjectDTO } from "../../dtos/IDeleteObjectDTO";
import axios, { AxiosResponse } from "axios";

interface IResponsePython {
  width: number;
  height: number;
}
class ObjectsRepository implements IObjectRepository {
  private prisma = new PrismaClient();

  async create({ url, user_id }: ICreateObjectDTO): Promise<void> {
    const pythonResponse = await this.getWidthAndHeight(url);

    await this.prisma.objects.create({
      data: {
        width: pythonResponse.width,
        height: pythonResponse.height,
        user_id,
        image_url: url
      }
    })
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

  async getWidthAndHeight(url: string): Promise<IResponsePython> {
    const pythonAPI = "http://18.231.151.26/measurement";

    const request = await axios.post(pythonAPI, {
      'image_url': url
    }) 
    const { width, height } = request.data;

    return { width, height } as IResponsePython;
  }
}

export { ObjectsRepository };