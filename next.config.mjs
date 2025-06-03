import createNextIntlPlugin from "next-intl/plugin";
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        hostname: "images.pexels.com",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin("./app/i18n/request.ts");
export default withNextIntl(nextConfig);
