import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL(`${process.env.S3_PUBLIC_URL}**`)],
  },
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
