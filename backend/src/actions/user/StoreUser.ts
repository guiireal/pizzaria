import { PrismaClient } from "@prisma/client";
import { CryptoService } from "../../services/CryptoService";

type StoreUserInputDTO = {
  name: string;
  email: string;
  password: string;
};

export class StoreUser {
  constructor(
    private readonly prismaClient: PrismaClient,
    private readonly cryptoService: CryptoService
  ) {}

  public async handle({ name, email, password }: StoreUserInputDTO) {
    const user = await this.prismaClient.user.create({
      data: {
        name,
        email,
        password: this.cryptoService.hash(password),
      },
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
