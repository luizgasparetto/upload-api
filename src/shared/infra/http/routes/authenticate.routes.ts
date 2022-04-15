import { Router } from "express";
import { AuthenticateUserController } from "../../../../modules/users/domain/useCases/authenticateUser/AuthenticateUserController";

const authenticateRouter = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRouter.post("/sessions", authenticateUserController.handle);

export { authenticateRouter };
