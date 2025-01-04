import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient();

export class PrismaService {
  private readonly prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  public get client() {
    return this.prismaClient;
  }
}
