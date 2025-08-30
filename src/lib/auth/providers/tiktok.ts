import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers";

export interface TikTokProfile extends Record<string, unknown> {
  data: {
    user: {
      union_id: string;
      open_id: string;
      avatar_url: string;
      display_name: string;
    };
  };
}

export default function TikTok<P extends TikTokProfile>(
  options: OAuthUserConfig<P>
): OAuthConfig<P> {
  return {
    id: "tiktok",
    name: "TikTok",
    type: "oauth",
    authorization: {
      url: "https://www.tiktok.com/v2/auth/authorize",
      params: {
        scope: "user.info.basic",
        response_type: "code",
        client_key: options.clientId,
      },
    },
    token: {
      url: "https://open.tiktokapis.com/v2/oauth/token/",
      async request({
        params,
        provider,
      }: {
        params: { code: string; redirect_uri: string };
        provider: { token?: { url?: string } };
      }) {
        const tokenUrl = provider.token?.url;
        if (!tokenUrl) {
          throw new Error("Token URL is not configured");
        }

        const response = await fetch(tokenUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cache-Control": "no-cache",
          },
          body: new URLSearchParams({
            client_key: options.clientId!,
            client_secret: options.clientSecret!,
            code: params.code,
            grant_type: "authorization_code",
            redirect_uri: params.redirect_uri,
          }),
        });

        const tokens = await response.json();
        return { tokens };
      },
    },
    userinfo: {
      url: "https://open.tiktokapis.com/v2/user/info/",
      async request({
        tokens,
        provider,
      }: {
        tokens: { access_token: string };
        provider: { userinfo?: { url?: string } };
      }) {
        const userinfoUrl = provider.userinfo?.url;
        if (!userinfoUrl) {
          throw new Error("Userinfo URL is not configured");
        }

        const response = await fetch(userinfoUrl, {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        });

        const profile = await response.json();
        return profile;
      },
    },
    profile(profile: P) {
      return {
        id: profile.data.user.open_id,
        name: profile.data.user.display_name,
        username: profile.data.user.display_name
          .toLowerCase()
          .replace(/[^a-z0-9]/g, ""),
        email: `${profile.data.user.open_id}@tiktok.placeholder`, // TikTok doesn't provide email
        role: "reader" as const,
        image: profile.data.user.avatar_url,
      };
    },
    options,
  };
}
