import cors from "cors";

import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";

import "express-async-errors";

import { routes } from "./routes";

const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(routes);

app.use((error: Error, _: Request, res: Response, __: NextFunction) => {
  if (error instanceof Error) {
    res.status(400).json({ error: error.message });
  }

  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
