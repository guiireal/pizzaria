import { PrismaClient } from "@prisma/client";

export class GetUserByEmail {
  constructor(private readonly prismaClient: PrismaClient) {}

  async handle(email: string) {
    return await this.prismaClient.user.findFirst({
      where: {
        email,
      },
    });
  }
}
