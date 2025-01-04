import cors from "cors";

import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";

import "express-async-errors";

import { BadRequestError } from "./errors/BadRequestError";
import { ForbiddenError } from "./errors/ForbiddenError";
import { NotAuthorizedError } from "./errors/NotAuthorizedError";
import { categoryRoutes, productRoutes, routes } from "./routes";

import path from "node:path";

const PORT = process.env.APP_PORT || 3333;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(routes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

app.use("/uploads", express.static(path.resolve(__dirname, "..", "temp")));

app.use((error: Error, _: Request, res: Response, __: NextFunction) => {
  console.log(error);

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

  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
