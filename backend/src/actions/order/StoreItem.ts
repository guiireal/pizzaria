import { PrismaClient } from "@prisma/client";

type StoreItemInputDTO = {
  orderId: string;
  productId: string;
  quantity: number;
};

export class StoreItem {
  constructor(private prismaClient: PrismaClient) {}

  async handle({ orderId, productId, quantity }: StoreItemInputDTO) {
    return await this.prismaClient.item.create({
      data: {
        orderId,
        productId,
        quantity,
      },
      select: {
        id: true,
        orderId: true,
        productId: true,
        quantity: true,
      },
    });
  }
}
