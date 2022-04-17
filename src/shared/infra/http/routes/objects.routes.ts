import { Router } from "express";
import { CreateObjectController } from "../../../../modules/objects/domain/useCases/createObject/CreateObjectController";
import { UpdateObjectImageController } from "../../../../modules/objects/domain/useCases/updateImageObject/UpdateObjectImageController";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

import multer from "multer";
import { multerConfig } from "../../../config/multer";

const objectsRouter = Router();

const createObjectController = new CreateObjectController();
const updateImageObjectController = new UpdateObjectImageController();

objectsRouter.use(ensureAuthenticated);

objectsRouter.post("/", ensureAuthenticated, createObjectController.handle);
objectsRouter.patch("/:object_id", ensureAuthenticated, multer(multerConfig).single("image"), updateImageObjectController.handle)

export { objectsRouter };