import jwtEncode from "jwt-encode";

/**
 * Creates a JWT token from session data
 * @param sessionData The session data to encode in the token
 * @returns A JWT token string
 */
export function createJwtToken(sessionData: any): string {
  // Use a secret key for signing the token
  // This should match the secret used in your NestJS server
  const secret = process.env.NEXTAUTH_SECRET || "your-secret-key";
  
  // Create a payload with the session data
  const payload = {
    sub: sessionData.user?.id || "unknown",
    name: sessionData.user?.name,
    email: sessionData.user?.email,
    role: sessionData.user?.role || "user",
    // Add any other properties you want in the token
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour expiration
  };
  
  // Encode the payload as a JWT
  return jwtEncode(payload, secret, { alg: "HS256" });
} 