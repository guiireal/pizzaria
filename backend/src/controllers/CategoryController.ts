import type { Request, Response } from "express";
import { AllCategories } from "../actions/category/AllCategories";
import { StoreCategory } from "../actions/category/StoreCategory";
import { BadRequestError } from "../errors/BadRequestError";

type StoreCategoryReqBody = {
  name: string;
};

export class CategoryController {
  constructor(
    private readonly storeCategory: StoreCategory,
    private readonly allCategories: AllCategories
  ) {}

  public async index(_: Request, res: Response) {
    const categories = await this.allCategories.handle();

    res.json(categories);
  }

  public async store(req: Request, res: Response) {
    const { name } = req.body as StoreCategoryReqBody;

    if (!name) {
      throw new BadRequestError("Name is required!");
    }

    const category = await this.storeCategory.handle({ name });

    res.json({
      id: category.id,
      name: category.name,
      created_at: category.createdAt,
    });
  }
}
