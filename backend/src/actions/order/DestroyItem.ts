import { PrismaClient } from "@prisma/client";

type DestroyItemInputDTO = {
  orderId: string;
  itemId: string;
};

export class DestroyItem {
  constructor(private prismaClient: PrismaClient) {}

  async handle({ orderId, itemId }: DestroyItemInputDTO) {
    return await this.prismaClient.item.delete({
      where: {
        id: itemId,
        orderId: orderId,
      },
    });
  }
}
