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
  },
  experimental: {
    taint: true,
  },
};

export default nextConfig;
