import { PrismaClient } from "@prisma/client";

export class AllProducts {
  constructor(private readonly prismaClient: PrismaClient) {}

  public async handle(categoryId?: string) {
    const filter: { categoryId?: string } = {};

    if (categoryId) {
      filter.categoryId = categoryId;
    }

    return this.prismaClient.product.findMany({
      where: filter,
      select: {
        id: true,
        name: true,
        price: true,
        banner: true,
        description: true,
        category: { select: { id: true, name: true } },
      },
      orderBy: { name: "asc" },
    });
  }
}
