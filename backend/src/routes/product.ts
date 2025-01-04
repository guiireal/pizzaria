import { Router } from "express";
import multer from "multer";
import { AllProducts } from "../actions/product/AllProducts";
import { StoreProduct } from "../actions/product/StoreProduct";
import { GetUserById } from "../actions/user/GetUserById";
import { ProductController } from "../controllers/ProductController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { JWTService } from "../services/JWTService";
import { PrismaService } from "../services/PrismaService";
import { StorageService } from "../services/StorageService";

const routes = Router();

const prismaClient = new PrismaService().client;
const jwtService = new JWTService();
const getUserById = new GetUserById(prismaClient);
const storeProduct = new StoreProduct(prismaClient);
const storageService = new StorageService();
const authMiddleware = new AuthMiddleware(jwtService, getUserById);
const allProducts = new AllProducts(prismaClient);
const productController = new ProductController(storeProduct, allProducts);

const upload = multer(storageService.upload("temp"));

routes.post(
  "/",
  authMiddleware.handle.bind(authMiddleware),
  upload.single("banner"),
  productController.store.bind(productController)
);

routes.get(
  "/",
  authMiddleware.handle.bind(authMiddleware),
  productController.index.bind(productController)
);

export { routes as productRoutes };
