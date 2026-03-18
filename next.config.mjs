import path from "path";
import { fileURLToPath } from "url";

/** @type {import('next').NextConfig} */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IPFS_GATEWAY = new URL(process.env.NEXT_PUBLIC_IPFS_GATEWAY || "https://ipfs.io/");

const nextConfig = () => ({
  serverExternalPackages: ["@meshsdk/core", "@meshsdk/core-cst"],
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: IPFS_GATEWAY.protocol.slice(0, -1), // Remove trailing colon
        hostname: IPFS_GATEWAY.hostname,
        pathname: "/**",
      },
    ],
  },
  output: "standalone",
  reactStrictMode: true,
  webpack: function (config) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    // libsodium-wrappers-sumo uses relative import `./libsodium-sumo.mjs`
    // but the file lives in the separate libsodium-sumo package
    config.resolve.alias = {
      ...config.resolve.alias,
      "./libsodium-sumo.mjs": path.resolve(
        __dirname,
        "node_modules/libsodium-sumo/dist/modules-sumo-esm/libsodium-sumo.mjs",
      ),
    };
    return config;
  },
});

export default nextConfig;
