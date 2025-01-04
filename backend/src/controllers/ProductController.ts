import type { Request, Response } from "express";
import { StoreProduct } from "../actions/product/StoreProduct";

type StoreProductReqBody = {
  name: string;
  price: number;
  description: string;
  banner: string;
  category_id: string;
};

export class ProductController {
  constructor(private readonly storeProduct: StoreProduct) {}

  public async store(req: Request, res: Response) {
    const { name, price, description, banner, category_id } =
      req.body as StoreProductReqBody;

    const product = await this.storeProduct.handle({
      name,
      price,
      description,
      banner,
      categoryId: category_id,
    });

    res.json(product);
  }
}
