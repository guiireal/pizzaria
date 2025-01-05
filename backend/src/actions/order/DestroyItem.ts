import { PrismaClient } from "@prisma/client";

export class DestroyItem {
  constructor(private prismaClient: PrismaClient) {}

  async handle(id: string) {
    return await this.prismaClient.item.delete({
      where: {
        id,
      },
    });
  }
}
