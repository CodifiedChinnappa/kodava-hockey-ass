/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [{ protocol: "https", hostname: "source.unsplash.com" },{ protocol: "https", hostname: "kundyolanda.com" }],
    },
  };
  
export default nextConfig;
