import { PrismaClient } from "@prisma/client";
import { UserEntity } from "../../entities/UserEntity";
import { IUserRepository, IRequest } from "../IUserRepository";

class UserRepository implements IUserRepository {
  private prisma = new PrismaClient();

  async create({ email, password }: IRequest): Promise<void> {
    await this.prisma.user.create({
      data: { email, password },
    })
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.prisma.user.findFirst({
      where: { email }
    });

    return user;
  }
}

export { UserRepository }