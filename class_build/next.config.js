/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  generateBuildId: () => "codecamp_deploy_05",
  exportPathMap: () => ({
    "/": { page: "/" },
    "/boards": { page: ".boards" },
    "/404": { page: "/404" },
  }),
};

module.exports = nextConfig;
