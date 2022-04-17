import { Router } from "express";
import { CreateUserController } from "../../../modules/users/useCases/createUser/CreateUserController";
import { DeleteUserController } from "../../../modules/users/useCases/deleteUser/DeleteUserController";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

const userRoutes = Router();

const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();

userRoutes.post("/", createUserController.handle);
userRoutes.delete("/", ensureAuthenticated, deleteUserController.handle);

export { userRoutes };