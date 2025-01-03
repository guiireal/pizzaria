import { Router } from "express";
import { GetUserByEmail } from "./actions/user/GetUserByEmail";
import { StoreUser } from "./actions/user/StoreUser";
import { UserController } from "./controllers/UserController";
import { CryptoService } from "./services/CryptoService";
import { PrismaService } from "./services/PrismaService";

const routes = Router();

const prismaService = new PrismaService();
const cryptoService = new CryptoService();

const userController = new UserController(
  new StoreUser(prismaService.client, cryptoService),
  new GetUserByEmail(prismaService.client)
);

routes.post("/users", (req, res) => userController.store(req, res));

export { routes };
