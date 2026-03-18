import { createHmac, timingSafeEqual } from "crypto";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

const TOKEN_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export type TokenPayload = {
  id: string;
  address: string;
  wallet: string;
  exp: number;
};

// HMAC-SHA256 helper using Node.js crypto (replaces CryptoJS)
function hmacSign(data: string): string {
  return createHmac("sha256", JWT_SECRET!).update(data).digest("hex");
}

// Sign a token with HMAC-SHA256 (base64 payload + signature)
export function signToken(payload: Omit<TokenPayload, "exp">): string {
  const data: TokenPayload = { ...payload, exp: Date.now() + TOKEN_EXPIRY_MS };
  const json = JSON.stringify(data);
  const base64 = Buffer.from(json, "utf-8").toString("base64");
  const signature = hmacSign(base64);
  return `${base64}.${signature}`;
}

// Verify token signature and expiry, return payload or null
export function verifyToken(token: string): TokenPayload | null {
  try {
    const [base64, signature] = token.split(".");
    if (!base64 || !signature) return null;

    // Timing-safe comparison to prevent timing attacks
    const expected = hmacSign(base64);
    const sigBuf = Buffer.from(signature, "utf-8");
    const expBuf = Buffer.from(expected, "utf-8");
    if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) return null;

    const json = Buffer.from(base64, "base64").toString("utf-8");
    const payload: TokenPayload = JSON.parse(json);
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}
