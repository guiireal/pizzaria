import type { Request, Response } from "express";
import { AuthUser } from "../actions/auth/AuthUser";

type SignInAuthReqBody = {
  email: string;
  password: string;
};

class AuthController {
  constructor(private readonly authUser: AuthUser) {}

  public async signIn(req: Request, res: Response) {
    const { email, password } = req.body as SignInAuthReqBody;

    const result = await this.authUser.handle({ email, password });

    res.json(result);
  }
}

export { AuthController };
