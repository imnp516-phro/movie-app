  import type { NextConfig } from "next";

  const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/**", // Cho phép lấy tất cả ảnh từ domain này
      },
    ],
  },
  };

  export default nextConfig;
