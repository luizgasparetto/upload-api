import { PrismaClient, User } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { IUserRepository, IRequest } from "../IUserRepository";

@injectable()
class UserRepository implements IUserRepository {
  async create({ email, password }: IRequest): Promise<void> {
    const prisma = new PrismaClient();

    await prisma.user.create({
      data: { email, password },
    })
  }

  async findByEmail(email: string): Promise<User> {
    const prisma = new PrismaClient();

    const user = await prisma.user.findFirst({
      where: {
        email,
      }
    });

    return user;
  }
}

export { UserRepository }