import { PrismaClient } from "@prisma/client";

type GetOrderByIdInputDTO = {
  id: string;
};

export class GetOrderById {
  constructor(private readonly prismaClient: PrismaClient) {}

  async handle({ id }: GetOrderByIdInputDTO) {
    return await this.prismaClient.order.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        table: true,
        name: true,
        draft: true,
        status: true,
        createdAt: true,
        items: {
          select: {
            id: true,
            quantity: true,
            product: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
          },
        },
      },
    });
  }
}
