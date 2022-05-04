import { Router } from "express";
import { CreateObjectController } from "../../../../modules/objects/useCases/createObject/CreateObjectController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import multer from "multer";
import { multerConfig } from "../../../../config/multer";
import { GetObjectsController } from "../../../../modules/objects/useCases/getObjects/GetObjectsController";
import { DeleteObjectController } from "../../../../modules/objects/useCases/deleteObject/DeleteObjectController";

const objectsRouter = Router();

const createObjectController = new CreateObjectController();
const getObjectsController = new GetObjectsController();
const deleteObjectController = new DeleteObjectController();

objectsRouter.get("/", getObjectsController.handle);
objectsRouter.post("/", ensureAuthenticated, multer(multerConfig).single("image"), createObjectController.handle);
objectsRouter.delete("/:object_id", ensureAuthenticated, deleteObjectController.handle);

export { objectsRouter };