import { Router } from "express";
import { CreateUserController } from "../../../../modules/users/domain/useCases/createUser/CreateUserController";
import { DeleteUserController } from "../../../../modules/users/domain/useCases/deleteUser/DeleteUserController";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

const userRoutes = Router();

const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();

userRoutes.post("/", createUserController.handle);
userRoutes.delete("/:id", ensureAuthenticated,deleteUserController.handle);

export { userRoutes };