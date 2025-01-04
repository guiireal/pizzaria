import { PrismaClient } from "@prisma/client";

export class GetUserById {
  constructor(private readonly prismaClient: PrismaClient) {}

  public async handle(id: string) {
    const user = await this.prismaClient.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }
}
