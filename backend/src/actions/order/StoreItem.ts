import { PrismaClient } from "@prisma/client";

type StoreItemInputDTO = {
  orderId: string;
  productId: string;
  quantity: number;
};

export class StoreItem {
  constructor(private prismaClient: PrismaClient) {}

  async handle({ orderId, productId, quantity }: StoreItemInputDTO) {
    await this.prismaClient.item.create({
      data: {
        orderId,
        productId,
        quantity,
      },
    });
  }
}
