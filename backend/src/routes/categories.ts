import { Router } from "express";
import { AllCategories } from "../actions/category/AllCategories";
import { StoreCategory } from "../actions/category/StoreCategory";
import { GetUserById } from "../actions/user/GetUserById";
import { CategoryController } from "../controllers/CategoryController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { JWTService } from "../services/JWTService";
import { PrismaService } from "../services/PrismaService";

const routes = Router();

const prismaClient = new PrismaService().client;
const storeCategory = new StoreCategory(prismaClient);
const allCategories = new AllCategories(prismaClient);

const categoryController = new CategoryController(storeCategory, allCategories);

const getUserById = new GetUserById(prismaClient);
const jwtService = new JWTService();
const authMiddleware = new AuthMiddleware(jwtService, getUserById);

routes.post(
  "/",
  authMiddleware.handle.bind(authMiddleware),
  categoryController.store.bind(categoryController)
);

routes.get(
  "/",
  authMiddleware.handle.bind(authMiddleware),
  categoryController.index.bind(categoryController)
);

export { routes as categoryRoutes };
