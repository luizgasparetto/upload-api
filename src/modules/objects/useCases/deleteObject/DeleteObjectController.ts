import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteObjectUseCase } from "./DeleteObjectUseCase";

class DeleteObjectController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { object_id } = request.params;

    const deleteObjectUseCase = container.resolve(DeleteObjectUseCase);

    await deleteObjectUseCase.execute({ object_id });

    return response.send();
  }
}

export { DeleteObjectController };