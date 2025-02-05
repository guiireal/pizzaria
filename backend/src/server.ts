import cors from "cors";
import path from "node:path";

import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";

import "express-async-errors";

import { BadRequestError } from "./errors/BadRequestError";
import { ForbiddenError } from "./errors/ForbiddenError";
import { NotAuthorizedError } from "./errors/NotAuthorizedError";
import { NotFoundError } from "./errors/NotFoundError";
import { categoryRoutes, orderRoutes, productRoutes, routes } from "./routes";

const PORT = process.env.APP_PORT || 3333;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(routes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.use("/uploads", express.static(path.resolve(__dirname, "..", "temp")));

app.use((error: Error, _: Request, res: Response, __: NextFunction) => {
  if (error instanceof BadRequestError) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });

    return;
  }

  if (error instanceof NotAuthorizedError) {
    res.status(401).json({
      status: "error",
      message: error.message,
    });

    return;
  }

  if (error instanceof ForbiddenError) {
    res.status(403).json({
      status: "error",
      message: error.message,
    });

    return;
  }

  if (error instanceof NotFoundError) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });

    return;
  }

  console.log(error);

  res.status(500).json({
    status: "error",
    message: error.message
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
