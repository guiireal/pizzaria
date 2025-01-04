import { Router } from "express";
import { StoreProduct } from "../actions/product/StoreProduct";
import { GetUserById } from "../actions/user/GetUserById";
import { ProductController } from "../controllers/ProductController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { JWTService } from "../services/JWTService";
import { PrismaService } from "../services/PrismaService";

const routes = Router();

const prismaClient = new PrismaService().client;
const jwtService = new JWTService();
const getUserById = new GetUserById(prismaClient);
const storeProduct = new StoreProduct(prismaClient);

const authMiddleware = new AuthMiddleware(jwtService, getUserById);

const productController = new ProductController(storeProduct);

routes.post(
  "/",
  authMiddleware.handle.bind(authMiddleware),
  productController.store.bind(productController)
);

export { routes as productRoutes };
