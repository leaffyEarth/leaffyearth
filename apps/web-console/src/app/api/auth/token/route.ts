import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import jwtEncode from 'jwt-encode';

export async function GET(request: NextRequest) {
  try {
    // Get the session on the server side
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    // Create a payload with the session data
    const payload = {
      sub: session.user?.id || "unknown",
      name: session.user?.name,
      email: session.user?.email,
      role: session.user?.role || "user",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour expiration
    };
    
    // Get the secret from environment variables (server-side only)
    const secret = process.env.NEXTAUTH_SECRET || "your-secret-key";
    // Encode the payload as a JWT
    const token = jwtEncode(payload, secret, { alg: "HS256" });
    
    return NextResponse.json({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    return NextResponse.json({ error: 'Failed to generate token' }, { status: 500 });
  }
} 