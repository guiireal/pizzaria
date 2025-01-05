import { PrismaClient } from "@prisma/client";

type StoreOrderInputDTO = {
  table: number;
  name: string;
};

export class StoreOrder {
  constructor(private readonly prismaClient: PrismaClient) {}

  async handle({ table, name }: StoreOrderInputDTO) {
    return await this.prismaClient.order.create({
      data: {
        table,
        name,
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
