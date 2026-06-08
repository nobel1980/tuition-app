import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  // Optional: If your routing drops the .html extension, ensuring trailing slashes helps cPanel's Apache server resolve paths accurately
  trailingSlash: true,
  images: {
    unoptimized: true, // Static exports do not support Next.js built-in Image Optimization API
  },
};

export default nextConfig;
