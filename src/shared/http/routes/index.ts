import { Router } from "express";
import { authenticateRouter } from "./authenticate.routes";
import { objectsRouter } from "./objects.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/user", userRoutes);
router.use("/objects", objectsRouter);
router.use(authenticateRouter);

export { router }