import { sign, verify } from "jsonwebtoken";

type JWTSignInInputDTO = {
  id: string;
  name: string;
  email: string;
};

type JWTVerifyOutputDTO = {
  sub: string;
};

class JWTService {
  private readonly secretToken: string;
  private readonly expiresIn: string;

  constructor() {
    this.secretToken = process.env.JWT_SECRET_KEY!;
    this.expiresIn = process.env.JWT_EXPIRES_IN!;
  }

  public signIn({ id, name, email }: JWTSignInInputDTO) {
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

  public verifyToken(jwtToken: string) {
    try {
      const { sub } = verify(jwtToken, this.secretToken) as JWTVerifyOutputDTO;

      return sub;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export { JWTService };
