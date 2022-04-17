import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateImageObjectUseCase } from "./UpdateObjectImageUseCase";

class UpdateObjectImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { object_id } = request.params;

    const file = request.file as Express.Multer.File;

    console.log(file);

    const filename = file.filename as string;
    const url = file["location"] as string;

    const updateObjectImageUseCase = container.resolve(UpdateImageObjectUseCase);

    await updateObjectImageUseCase.execute({ object_id, url, filename });

    return response.status(204).send();
  }
}

export { UpdateObjectImageController };