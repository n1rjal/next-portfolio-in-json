/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "**",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/blogs",
        destination: "https://n1cs.nirjalpaudel.com.np",
        permanent: true,
      },
      {
        source: "/blogs/:path*",
        destination: "https://n1cs.nirjalpaudel.com.np/:path*",
        permanent: true,
      },
    ];
  },
};
module.exports = nextConfig;
