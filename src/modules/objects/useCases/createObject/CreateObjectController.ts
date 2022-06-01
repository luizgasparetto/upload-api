import { Request, response, Response } from "express";
import { container } from "tsyringe";
import { CreateObjectUseCase } from "./CreateObjectUseCase";

class CreateObjectController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const file = request.file as Express.Multer.File;

    const filename = file.filename as string;
    const url = file["location"] as string;

    const createObjectUseCase = container.resolve(CreateObjectUseCase);

    await createObjectUseCase.execute({ url, filename, user_id });

    return response.status(201).json({ message: "Object created successfully" });
  }
}

export { CreateObjectController };