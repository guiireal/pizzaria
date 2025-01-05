import { PrismaClient } from "@prisma/client";

export class DestroyOrder {
  constructor(private readonly prismaClient: PrismaClient) {}

  async handle(id: string) {
    return await this.prismaClient.order.delete({
      where: {
        id,
      },
    });
  }
}
