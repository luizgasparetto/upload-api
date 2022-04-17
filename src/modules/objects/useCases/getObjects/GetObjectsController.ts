import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetObjectUseCase } from "./GetObjectsUseCase";

class GetObjectsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getObjectsUseCase = container.resolve(GetObjectUseCase);

    const objects = await getObjectsUseCase.execute();

    return response.json(objects);
  }
}

export { GetObjectsController };