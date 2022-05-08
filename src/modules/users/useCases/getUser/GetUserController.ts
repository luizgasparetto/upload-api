import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetUserUseCase } from "./GetUserUseCase";

class GetUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const getUserUseCase = container.resolve(GetUserUseCase);

    const user = await getUserUseCase.execute(id);

    return response.json(user);
  }
}

export { GetUserController };