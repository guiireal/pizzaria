import { PrismaClient } from "@prisma/client";

type StoreProductInputDTO = {
  name: string;
  price: number;
  description: string;
  banner: string;
  categoryId: string;
};

export class StoreProduct {
  constructor(private readonly prismaClient: PrismaClient) {}

  public async handle({
    name,
    price,
    description,
    banner,
    categoryId,
  }: StoreProductInputDTO) {
    return await this.prismaClient.product.create({
      data: {
        name,
        price,
        description,
        banner,
        categoryId,
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        banner: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}
