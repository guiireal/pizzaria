import { Router } from "express";
import { AuthUser } from "./actions/auth/AuthUser";
import { GetUserByEmail } from "./actions/user/GetUserByEmail";
import { GetUserById } from "./actions/user/GetUserById";
import { StoreUser } from "./actions/user/StoreUser";
import { AuthController } from "./controllers/AuthController";
import { UserController } from "./controllers/UserController";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";
import { CryptoService } from "./services/CryptoService";
import { JWTService } from "./services/JWTService";
import { PrismaService } from "./services/PrismaService";

const routes = Router();

const prismaClient = new PrismaService().client;
const cryptoService = new CryptoService();
const getUserByEmail = new GetUserByEmail(prismaClient);
const jwtService = new JWTService();
const storeUser = new StoreUser(prismaClient, cryptoService);
const authUser = new AuthUser(getUserByEmail, cryptoService, jwtService);
const getUserById = new GetUserById(prismaClient);

const authMiddleware = new AuthMiddleware(jwtService, getUserById);

const userController = new UserController(storeUser, getUserByEmail);
const authController = new AuthController(authUser);

routes.post("/sign-in", authController.signIn.bind(authController));

routes.get(
  "/me",
  authMiddleware.handle.bind(authMiddleware),
  authController.me.bind(authController)
);

routes.post("/users", userController.store.bind(userController));

export { routes };
