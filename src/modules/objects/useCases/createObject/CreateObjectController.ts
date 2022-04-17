import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { CreateObjectUseCase } from "./CreateObjectUseCase";

class CreateObjectController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { width, height } = request.body;
    const { id: user_id } = request.user;

    const createObjectUseCase = container.resolve(CreateObjectUseCase);

    await createObjectUseCase.execute({ width, height, user_id });

    return response.status(201).json({ message: "Object created successfully" });
  }
}

export { CreateObjectController };