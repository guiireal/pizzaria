import type { Request, Response } from "express";
import { GetUserByEmail } from "../actions/user/GetUserByEmail";
import { StoreUser } from "../actions/user/StoreUser";
import { BadRequestError } from "../errors/BadRequestError";

type StoreUserReqBody = {
  name: string;
  email: string;
  password: string;
};

export class UserController {
  constructor(
    private readonly storeUser: StoreUser,
    private readonly getUserByEmail: GetUserByEmail
  ) {}

  public async store(req: Request, res: Response) {
    const { name, email, password } = req.body as StoreUserReqBody;

    if (!name) {
      throw new BadRequestError("Name is required!");
    }

    if (!email) {
      throw new BadRequestError("Email is required!");
    }

    if (!password) {
      throw new BadRequestError("Password is required!");
    }

    const userAlreadyExists = await this.getUserByEmail.handle(email);

    if (userAlreadyExists) {
      throw new BadRequestError("User already exists!");
    }

    const user = await this.storeUser.handle({ name, email, password });

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.createdAt,
    });
  }
}
