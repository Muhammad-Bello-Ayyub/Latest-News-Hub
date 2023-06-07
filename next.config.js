/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  //Settings to use remote patterns urls for images
  images: {
    domains:["www.s1.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ]
  }
}

module.exports = nextConfig
