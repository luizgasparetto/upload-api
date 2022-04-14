import { Router } from "express";
import { CreateUserController } from "../../../modules/users/domain/useCases/createUser/CreateUserController";
import { DeleteUserController } from "../../../modules/users/domain/useCases/deleteUser/DeleteUserController";

const userRoutes = Router();

const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();

userRoutes.post("/", createUserController.handle);
userRoutes.delete("/:id", deleteUserController.handle);

export { userRoutes };