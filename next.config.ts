import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; " +
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://accounts.google.com https://mfjskkkttsscftquynnu.supabase.co https://www.youtube.com https://s.ytimg.com https://www.google.com; " +
              "style-src 'self' 'unsafe-inline'; " +
              "img-src 'self' data: https: https://i.ytimg.com https://yt3.ggpht.com; " +
              "connect-src 'self' https://mfjskkkttsscftquynnu.supabase.co https://accounts.google.com https://www.youtube.com https://www.google.com; " +
              "frame-src 'self' https://accounts.google.com https://www.youtube.com https://www.youtube-nocookie.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
