import type { Request, Response } from "express";
import { AllOrders } from "../actions/order/AllOrders";
import { DestroyItem as DestroyItemAction } from "../actions/order/DestroyItem";
import { SendOrder } from "../actions/order/SendOrder";
import { StoreItem as StoreItemAction } from "../actions/order/StoreItem";
import { StoreOrder } from "../actions/order/StoreOrder";
import { DestroyOrder } from "./../actions/order/DestroyOrder";

type StoreOrderReqBody = {
  table: number;
  name: string;
};

type StoreItemOrderReqParams = {
  id: string;
};

type StoreItemOrderReqBody = {
  product_id: string;
  quantity: number;
};

type DestroyOrderReqParams = {
  id: string;
};

type DestroyItemOrderReqParams = {
  id: string;
  item_id: string;
};

type UpdateSendOrderReqParams = {
  id: string;
};

export class OrderController {
  constructor(
    private readonly allOrders: AllOrders,
    private readonly storeOrder: StoreOrder,
    private readonly destroyOrder: DestroyOrder,
    private readonly storeItemAction: StoreItemAction,
    private readonly destoryItemAction: DestroyItemAction,
    private readonly sendOrder: SendOrder
  ) {}

  async index(_: Request, res: Response) {
    const orders = await this.allOrders.handle();

    res.json(
      orders.map((order) => ({
        id: order.id,
        table: order.table,
        name: order.name,
        draft: order.draft,
        status: order.status,
        created_at: order.createdAt,
      }))
    );
  }

  async store(req: Request, res: Response) {
    const { table, name } = req.body as StoreOrderReqBody;

    const order = await this.storeOrder.handle({ table, name });

    res.json({
      id: order.id,
      table: order.table,
      name: order.name,
      draft: order.draft,
      status: order.status,
      created_at: order.createdAt,
    });
  }

  async destroy(req: Request, res: Response) {
    const { id } = req.params as DestroyOrderReqParams;

    const order = await this.destroyOrder.handle(id);

    res.json(order);
  }

  async storeItem(req: Request, res: Response) {
    const { id } = req.params as StoreItemOrderReqParams;
    const { product_id, quantity } = req.body as StoreItemOrderReqBody;

    const item = await this.storeItemAction.handle({
      orderId: id,
      productId: product_id,
      quantity,
    });

    res.json({
      id: item.id,
      order_id: item.orderId,
      product_id: item.productId,
      quantity: item.quantity,
    });
  }

  async destroyItem(req: Request, res: Response) {
    const { id, item_id } = req.params as DestroyItemOrderReqParams;

    const item = await this.destoryItemAction.handle({
      orderId: id,
      itemId: item_id,
    });

    res.json(item);
  }

  async send(req: Request, res: Response) {
    const { id } = req.params as UpdateSendOrderReqParams;

    const order = await this.sendOrder.handle({ orderId: id });

    res.json({
      id: order.id,
      table: order.table,
      name: order.name,
      draft: order.draft,
      status: order.status,
      created_at: order.createdAt,
    });
  }
}
