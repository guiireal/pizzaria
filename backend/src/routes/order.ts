import { Router } from "express";
import { DestroyOrder } from "../actions/order/DestroyOrder";
import { StoreItem } from "../actions/order/StoreItem";
import { StoreOrder } from "../actions/order/StoreOrder";
import { GetUserById } from "../actions/user/GetUserById";
import { OrderController } from "../controllers/OrderController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { JWTService } from "../services/JWTService";
import { PrismaService } from "../services/PrismaService";

const routes = Router();

const prismaClient = new PrismaService().client;
const storeOrder = new StoreOrder(prismaClient);
const destroyOrder = new DestroyOrder(prismaClient);
const storeItem = new StoreItem(prismaClient);
const orderController = new OrderController(
  storeOrder,
  destroyOrder,
  storeItem
);

const getUserById = new GetUserById(prismaClient);
const jwtService = new JWTService();
const authMiddleware = new AuthMiddleware(jwtService, getUserById);

routes.post(
  "/",
  authMiddleware.handle.bind(authMiddleware),
  orderController.store.bind(orderController)
);

routes.delete(
  "/:id",
  authMiddleware.handle.bind(authMiddleware),
  orderController.destroy.bind(orderController)
);

routes.post(
  "/:id/items",
  authMiddleware.handle.bind(authMiddleware),
  orderController.storeItem.bind(orderController)
);

export { routes as orderRoutes };
