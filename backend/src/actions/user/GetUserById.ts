import { PrismaClient } from "@prisma/client";

class GetUserById {
  constructor(private readonly prismaClient: PrismaClient) {}

  public async handle(id: string) {
    const user = await this.prismaClient.user.findUnique({
      where: { id },
    });

    return user;
  }
}

export { GetUserById };
