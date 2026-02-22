/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/assets/endorsements/:path*",
        destination: "/images/endorsements/:path*"
      }
    ];
  }
};
export default nextConfig;
