import crypto from "node:crypto";

class CryptoService {
  private readonly algorithm = "sha256";
  private readonly saltLength = 16;

  public hash(text: string): string {
    const salt = crypto.randomBytes(this.saltLength).toString("hex");

    const hash = crypto
      .createHmac(this.algorithm, salt)
      .update(text)
      .digest("hex");

    return `${salt}:${hash}`;
  }

  public compare(text: string, storedHash: string): boolean {
    const [salt, originalHash] = storedHash.split(":");

    const hash = crypto
      .createHmac(this.algorithm, salt)
      .update(text)
      .digest("hex");

    return hash === originalHash;
  }
}

export { CryptoService };
