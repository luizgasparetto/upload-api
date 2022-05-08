import { Router } from "express";
import { CreateUserController } from "../../../../modules/users/useCases/createUser/CreateUserController";
import { DeleteUserController } from "../../../../modules/users/useCases/deleteUser/DeleteUserController";
import { GetUserController } from "../../../../modules/users/useCases/getUser/GetUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const userRoutes = Router();

const getUserController = new GetUserController();
const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();

userRoutes.get("/", getUserController.handle);
userRoutes.post("/", createUserController.handle);
userRoutes.delete("/", ensureAuthenticated, deleteUserController.handle);

export { userRoutes };