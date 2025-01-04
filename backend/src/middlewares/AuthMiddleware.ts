import type { NextFunction, Request, Response } from "express";
import { GetUserById } from "../actions/user/GetUserById";
import { NotAuthorizedError } from "../errors/NotAuthorizedError";
import { JWTService } from "../services/JWTService";

export class AuthMiddleware {
  constructor(
    private readonly jwtService: JWTService,
    private readonly getUserById: GetUserById
  ) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      throw new NotAuthorizedError("Token not provided!");
    }

    if (!bearerToken.startsWith("Bearer ")) {
      throw new NotAuthorizedError("Invalid token!");
    }

    const [, token] = bearerToken.split(" ");

    const userId = this.jwtService.verifyToken(token);

    if (!userId) {
      throw new NotAuthorizedError("Invalid token!");
    }

    const user = await this.getUserById.handle(userId);

    if (!user) {
      throw new NotAuthorizedError("User not found!");
    }

    req.user = user;

    next();
  }
}
