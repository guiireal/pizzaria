import type { NextFunction, Request, Response } from "express";
import { GetUserById } from "../actions/user/GetUserById";
import { JWTService } from "../services/JWTService";

class AuthMiddleware {
  constructor(
    private readonly jwtService: JWTService,
    private readonly getUserById: GetUserById
  ) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      res.status(401).json({ message: "Token not provided!" });
      return;
    }

    if (!bearerToken.startsWith("Bearer ")) {
      res.status(401).json({ message: "Invalid token format!" });
      return;
    }

    const [, token] = bearerToken.split(" ");

    const userId = this.jwtService.verifyToken(token);

    if (!userId) {
      res.status(401).json({ message: "Invalid token!" });
      return;
    }

    const user = await this.getUserById.handle(userId);

    if (!user) {
      res.status(401).json({ message: "User not found!" });
      return;
    }

    req.user = user;

    next();
  }
}

export { AuthMiddleware };
