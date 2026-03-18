import CryptoJS from "crypto-js";

const JWT_SECRET = process.env.JWT_SECRET || "change-your-own-jwt-secret";
const TOKEN_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export type TokenPayload = {
  id: string;
  address: string;
  wallet: string;
  exp: number;
};

// Sign a token with HMAC-SHA256 (base64 payload + signature)
export function signToken(payload: Omit<TokenPayload, "exp">): string {
  const data: TokenPayload = { ...payload, exp: Date.now() + TOKEN_EXPIRY_MS };
  const json = JSON.stringify(data);
  const base64 = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(json));
  const signature = CryptoJS.HmacSHA256(base64, JWT_SECRET).toString();
  return `${base64}.${signature}`;
}

// Verify token signature and expiry, return payload or null
export function verifyToken(token: string): TokenPayload | null {
  try {
    const [base64, signature] = token.split(".");
    if (!base64 || !signature) return null;
    const expected = CryptoJS.HmacSHA256(base64, JWT_SECRET).toString();
    if (signature !== expected) return null;
    const json = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(base64));
    const payload: TokenPayload = JSON.parse(json);
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}
