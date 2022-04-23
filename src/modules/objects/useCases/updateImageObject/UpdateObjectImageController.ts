import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateObjectImageUseCase } from "./UpdateObjectImageUseCase";

class UpdateObjectImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { object_id } = request.params;
    const { id: user_id } = request.user;

    const file = request.file as Express.Multer.File;

    console.log(file);

    const filename = file.filename as string;
    const url = file["location"] as string;

    const updateObjectImageUseCase = container.resolve(UpdateObjectImageUseCase);

    await updateObjectImageUseCase.execute({ object_id, url, filename, user_id });

    return response.status(204).send();
  }
}

export { UpdateObjectImageController };