import { PrismaClient } from "@prisma/client";
import { UserEntity } from "../../domain/entities/UserEntity";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IDeleteUserDTO } from "../dtos/IDeleteUserDTO";

class UserRepository implements IUserRepository {
  private prisma = new PrismaClient();

  async create({ email, password }: ICreateUserDTO): Promise<void> {
    await this.prisma.user.create({
      data: { email, password },
    })
  }

  async delete({ id }: IDeleteUserDTO): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    })
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.prisma.user.findFirst({
      where: { email }
    });

    return user;
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.findFirst({
      where: { id }
    });

    return user;
  }
}

export { UserRepository }