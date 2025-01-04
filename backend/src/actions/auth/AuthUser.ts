import { CryptoService } from "../../services/CryptoService";
import { JWTService } from "../../services/JWTService";
import { GetUserByEmail } from "../user/GetUserByEmail";

type AuthUserInputDTO = {
  email: string;
  password: string;
};

type AuthUserOutputDTO = {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
};

export class AuthUser {
  constructor(
    private readonly getUserByEmail: GetUserByEmail,
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JWTService
  ) {}

  public async handle({
    email,
    password,
  }: AuthUserInputDTO): Promise<AuthUserOutputDTO> {
    const user = await this.getUserByEmail.handle(email);

    if (!user) {
      throw new Error("Email/Password does not match!");
    }

    if (!this.cryptoService.compare(password, user.password)) {
      throw new Error("Email/Password does not match!");
    }

    const token = this.jwtService.signIn({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}
