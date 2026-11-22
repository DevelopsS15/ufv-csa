/** @type {import('next').NextConfig} */
// import transpileModules from "next-transpile-modules";
// const withTM = transpileModules(["undici"]);

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    qualities: [75, 100]
  },
  experimental: {
    taint: true,
  },
};

export default nextConfig;
