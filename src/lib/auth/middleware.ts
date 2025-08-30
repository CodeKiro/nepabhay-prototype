import NextAuth from "next-auth";
import { appConfig } from "@/config/app";

// Middleware-safe auth configuration without database imports
export const { auth } = NextAuth({
  providers: [], // No providers needed for middleware
  session: {
    strategy: "jwt",
  },
  secret: appConfig.auth.secret,
});

export { auth as authMiddleware };
