import { PrismaClient } from "@prisma/client";

type SendOrderInputDTO = {
  orderId: string;
};

export class SendOrder {
  constructor(private readonly prismaClient: PrismaClient) {}

  async handle({ orderId }: SendOrderInputDTO) {
    return await this.prismaClient.order.update({
      where: { id: orderId },
      data: { draft: false },
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
