import "reflect-metadata";
import "express-async-errors";
import path from "path";
import express, { Response, Request, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import cors from "cors";

import swaggerFile from "../../../swagger.json";
import "../../container";
import { router } from "./routes";
import { AppError } from "../../errors/AppError";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/files", express.static(path.resolve(__dirname, "..", "..", "..", "tmp", "uploads")));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }

  return response.status(500).json({ message: "Unknown server error", error: err.message });
});

app.listen(3333, () => console.log("🔥 Running 🔥"));