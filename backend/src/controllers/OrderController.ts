import type { Request, Response } from "express";
import { DestroyOrder } from "../actions/order/DestroyOrder";
import { StoreOrder } from "../actions/order/StoreOrder";

type StoreOrderReqBody = {
  table: number;
  name: string;
};

export class OrderController {
  constructor(
    private readonly storeOrder: StoreOrder,
    private readonly destroyOrder: DestroyOrder
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
    const { id } = req.params;

    const order = await this.destroyOrder.handle(id);

    res.json(order);
  }
}
