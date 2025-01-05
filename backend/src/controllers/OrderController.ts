import type { Request, Response } from "express";
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

export class OrderController {
  constructor(
    private readonly storeOrder: StoreOrder,
    private readonly destroyOrder: DestroyOrder,
    private readonly storeItemAction: StoreItemAction
  ) {}

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

    await this.storeItemAction.handle({
      orderId: id,
      productId: product_id,
      quantity,
    });

    res.sendStatus(201);
  }
}
