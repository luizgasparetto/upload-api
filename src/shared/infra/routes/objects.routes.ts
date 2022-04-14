import { Router } from "express";
import { CreateObjectController } from "../../../modules/objects/domain/useCases/createObject/CreateObjectController";

const objectsRouter = Router();

const createObjectController = new CreateObjectController();

objectsRouter.post("/:user_id", createObjectController.handle);

export { objectsRouter };