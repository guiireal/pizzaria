import { PrismaClient } from "@prisma/client";

export class AllOrders {
  constructor(private readonly prismaClient: PrismaClient) {}

  async handle() {
    return await this.prismaClient.order.findMany({
      where: {
        draft: false,
        status: false,
      },
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
      },
    });
  }
}
