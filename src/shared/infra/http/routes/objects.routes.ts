import { Router } from "express";
import { CreateObjectController } from "../../../../modules/objects/domain/useCases/createObject/CreateObjectController";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

const objectsRouter = Router();

const createObjectController = new CreateObjectController();

objectsRouter.use(ensureAuthenticated);

objectsRouter.post("/:user_id", createObjectController.handle);

export { objectsRouter };