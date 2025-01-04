import type { Request, Response } from "express";
import { AllProducts } from "../actions/product/AllProducts";
import { StoreProduct } from "../actions/product/StoreProduct";
import { BadRequestError } from "../errors/BadRequestError";

type StoreProductReqBody = {
  name: string;
  price: string;
  description: string;
  banner: string;
  category_id: string;
};

type IndexProductReqQuery = {
  category_id?: string;
};

export class ProductController {
  constructor(
    private readonly storeProduct: StoreProduct,
    private readonly allProducts: AllProducts
  ) {}

  public async index(req: Request, res: Response) {
    const { category_id } = req.query as IndexProductReqQuery;

    const products = await this.allProducts.handle(category_id);
    res.json(products);
  }

  public async store(req: Request, res: Response) {
    const { name, price, description, category_id } =
      req.body as StoreProductReqBody;

    if (!req.file) {
      throw new BadRequestError("Banner is required!");
    }

    const banner = req.file.filename;

    const product = await this.storeProduct.handle({
      name,
      price: Number(price),
      description,
      banner,
      categoryId: category_id,
    });

    product.banner = `${process.env.APP_URL}/uploads/${product.banner}`;

    res.json(product);
  }
}
