import { PrismaClient } from "@prisma/client";

export class AllOrders {
  constructor(private readonly prismaClient: PrismaClient) {}

  async handle() {
    return await this.prismaClient.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        table: true,
        name: true,
        draft: true,
        status: true,
        createdAt: true,
        items: {
          select: {
            id: true,
            quantity: true,
            product: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
          },
        },
      },
    });
  }
}
