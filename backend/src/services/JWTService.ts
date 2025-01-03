import { sign } from "jsonwebtoken";

type JWTSignInDTO = {
  id: string;
  name: string;
  email: string;
};

class JWTService {
  private readonly secretToken: string;
  private readonly expiresIn: string;

  constructor() {
    this.secretToken = process.env.JWT_SECRET_KEY!;
    this.expiresIn = process.env.JWT_EXPIRES_IN!;
  }

  public signIn({ id, name, email }: JWTSignInDTO) {
    const token = sign(
      {
        name,
        email,
      },
      this.secretToken,
      {
        subject: id,
        expiresIn: this.expiresIn,
      }
    );

    return token;
  }
}

export { JWTService };
