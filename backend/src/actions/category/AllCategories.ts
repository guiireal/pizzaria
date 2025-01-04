import { PrismaClient } from "@prisma/client";

export class AllCategories {
  constructor(private readonly prismaClient: PrismaClient) {}

  public async handle() {
    return this.prismaClient.category.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });
  }
}
