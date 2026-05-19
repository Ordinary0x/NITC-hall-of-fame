/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

if (process.env.NODE_ENV === "production") {
  nextConfig.output = "export";
}

module.exports = nextConfig;
