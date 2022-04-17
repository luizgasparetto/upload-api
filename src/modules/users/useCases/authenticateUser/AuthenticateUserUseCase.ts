import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUserRepository } from "../../repositories/IUserRepository";

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IRequest {
  email: string,
  password: string,
}

interface IResponse {
  token: string,
  user: {
    email: string,
  }
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email/password doesn't match");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email/password doesn't match");
    }

    const token = sign({}, "2eb298f28c2d2a3f39bbe0702008fd0e", {
      subject: user.id,
      expiresIn: "1d"
    })

    const tokenReturn: IResponse = {
      token,
      user: { email }
    }

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };