const withMDX = require("@next/mdx")()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com", "s.gravatar.com", "cdn.auth0.com"],
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
}

module.exports = withMDX(nextConfig)
