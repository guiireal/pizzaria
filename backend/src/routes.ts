import { Router, type Request, type Response } from "express";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

export { routes };
