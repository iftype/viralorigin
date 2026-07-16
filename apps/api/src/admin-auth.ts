import {
  createHmac,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";

const sessionLifetimeSeconds = 60 * 60 * 12;
const failedLoginWindowMs = 15 * 60 * 1000;
const failedLoginLimit = 5;
const maxTrackedAddresses = 200;

type LoginAttempt = { count: number; windowStartedAt: number };

export class AdminAuth {
  private readonly loginAttempts = new Map<string, LoginAttempt>();

  constructor(
    private readonly passwordHash: string,
    private readonly sessionSecret: string,
    private readonly cookiePath: string,
  ) {}

  isConfigured() {
    return this.passwordHash.length > 0 && this.sessionSecret.length >= 32;
  }

  canAttempt(address: string) {
    const now = Date.now();
    const attempt = this.loginAttempts.get(address);
    if (!attempt || now - attempt.windowStartedAt > failedLoginWindowMs) {
      this.loginAttempts.delete(address);
      return true;
    }
    return attempt.count < failedLoginLimit;
  }

  recordFailure(address: string) {
    const now = Date.now();
    const current = this.loginAttempts.get(address);
    if (!current || now - current.windowStartedAt > failedLoginWindowMs) {
      this.loginAttempts.set(address, { count: 1, windowStartedAt: now });
    } else {
      current.count += 1;
    }

    if (this.loginAttempts.size > maxTrackedAddresses) {
      const oldest = this.loginAttempts.keys().next().value;
      if (oldest) this.loginAttempts.delete(oldest);
    }
  }

  clearFailures(address: string) {
    this.loginAttempts.delete(address);
  }

  verifyPassword(password: string) {
    const [algorithm, salt, expectedHex] = this.passwordHash.split("$");
    if (algorithm !== "scrypt" || !salt || !expectedHex) return false;

    const expected = Buffer.from(expectedHex, "hex");
    const actual = scryptSync(password, salt, expected.length);
    return expected.length === actual.length && timingSafeEqual(expected, actual);
  }

  createSessionCookie() {
    const expiresAt = Math.floor(Date.now() / 1000) + sessionLifetimeSeconds;
    const nonce = randomBytes(12).toString("base64url");
    const payload = Buffer.from(JSON.stringify({ expiresAt, nonce })).toString(
      "base64url",
    );
    const signature = this.sign(payload);
    return this.serializeCookie(`${payload}.${signature}`, sessionLifetimeSeconds);
  }

  clearSessionCookie() {
    return this.serializeCookie("", 0);
  }

  verifyCookieHeader(cookieHeader?: string) {
    if (!cookieHeader) return false;
    const value = cookieHeader
      .split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith("viral_admin="))
      ?.slice("viral_admin=".length);
    if (!value) return false;

    const [payload, signature] = value.split(".");
    if (!payload || !signature) return false;

    const expected = Buffer.from(this.sign(payload));
    const actual = Buffer.from(signature);
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
      return false;
    }

    try {
      const session = JSON.parse(
        Buffer.from(payload, "base64url").toString("utf8"),
      ) as { expiresAt?: number };
      return typeof session.expiresAt === "number" && session.expiresAt > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  private sign(payload: string) {
    return createHmac("sha256", this.sessionSecret)
      .update(payload)
      .digest("base64url");
  }

  private serializeCookie(value: string, maxAge: number) {
    return [
      `viral_admin=${value}`,
      `Path=${this.cookiePath}`,
      `Max-Age=${maxAge}`,
      "HttpOnly",
      "Secure",
      "SameSite=Strict",
    ].join("; ");
  }
}
