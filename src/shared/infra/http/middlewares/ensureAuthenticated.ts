import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../errors/AppError";

import { verify } from "jsonwebtoken";
import { UserRepository } from "../../../../modules/users/repositories/implementations/UserRepository";

interface IPayload {
  sub: string
}

async function ensureAuthenticated(request: Request, response: Response, next: NextFunction): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, "2eb298f28c2d2a3f39bbe0702008fd0e") as IPayload;

    const userRepository = new UserRepository();
    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError("User doesn't exists", 401);
    }

    request.user = user;

    next();
  } catch (error) {
    throw new AppError("Token invalid", 401)
  }
}

export { ensureAuthenticated };