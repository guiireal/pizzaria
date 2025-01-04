import { PrismaClient } from "@prisma/client";

type StoreCategoryInputDTO = {
  name: string;
};

export class StoreCategory {
  constructor(private readonly prismaClient: PrismaClient) {}

  public async handle({ name }: StoreCategoryInputDTO) {
    return await this.prismaClient.category.create({
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });
  }
}
