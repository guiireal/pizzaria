import { PrismaClient } from "@prisma/client";

type CompleteOrderInputDTO = {
  orderId: string;
};

export class CompleteOrder {
  constructor(private readonly prismaClient: PrismaClient) {}

  async handle({ orderId }: CompleteOrderInputDTO) {
    return await this.prismaClient.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: true,
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
