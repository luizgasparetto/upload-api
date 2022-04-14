import { Router } from "express";
import { objectsRouter } from "./objects.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/user", userRoutes);
router.use("/objects", objectsRouter);

export { router }