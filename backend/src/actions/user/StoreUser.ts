import { PrismaClient } from "@prisma/client";
import { CryptoService } from "../../services/CryptoService";

type StoreUserDTO = {
  name: string;
  email: string;
  password: string;
};

class StoreUser {
  constructor(
    private readonly prismaClient: PrismaClient,
    private readonly cryptoService: CryptoService
  ) {}

  public async handle({ name, email, password }: StoreUserDTO) {
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
      },
    });

    return user;
  }
}

export { StoreUser };
