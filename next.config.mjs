/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  env: {
    SLIPOK_API_KEY: 'c82ee757-1801-4905-a102-f602758c775a',
  },
};

export default nextConfig;
