/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  env: {
    appName: 'MVP',
    webUrl: 'http://localhost:3000',
    baseUrl: 'http://localhost:8080',
    googleApiKey: null,
    googleClientId: null,
    app_id: null,
    key: null,
    secret: null,
    cluster: 'ap3',
  },
  images: {
    domains: ['postimg.cc', 'timetaskteam-dev.s3.ap-northeast-1.amazonaws.com'],
  },
  experimental: {
    outputStandalone: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
