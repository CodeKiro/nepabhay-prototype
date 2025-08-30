import { auth } from "@/lib/auth/config";
import { getBaseUrlFromRequest } from "@/lib/utils/url";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    const baseUrl = getBaseUrlFromRequest(request);

    // Get environment info (safe for debugging)
    const envInfo = {
      nodeEnv: process.env.NODE_ENV,
      hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
      hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      nextAuthUrlLength: process.env.NEXTAUTH_URL?.length || 0,
      nextAuthSecretLength: process.env.NEXTAUTH_SECRET?.length || 0,
      requestBaseUrl: baseUrl, // Show the actual request base URL
    };

    return Response.json({
      session: session
        ? {
            user: {
              id: session.user?.id,
              email: session.user?.email,
              role: session.user?.role,
            },
            expires: session.expires,
          }
        : null,
      environment: envInfo,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Auth status error:", error);
    return Response.json(
      {
        error: "Failed to get auth status",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
