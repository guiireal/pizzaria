import { Router } from "express";
import { AuthUser } from "./actions/auth/AuthUser";
import { GetUserByEmail } from "./actions/user/GetUserByEmail";
import { StoreUser } from "./actions/user/StoreUser";
import { AuthController } from "./controllers/AuthController";
import { UserController } from "./controllers/UserController";
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

const userController = new UserController(storeUser, getUserByEmail);
const authController = new AuthController(authUser);

routes.post("/sign-in", (req, res) => authController.signIn(req, res));
routes.post("/users", (req, res) => userController.store(req, res));

export { routes };
