/** @type {import('next').NextConfig} */
const webpack = require("webpack");
const { parsed: envVars } = require("dotenv").config({
  path: `./.env`,
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["tailwindui.com"],
  },
  webpack(config) {
    if (process.env.NODE_ENV === "development") {
      config.plugins.push(new webpack.EnvironmentPlugin(envVars));
    } else {
      config.plugins.push(new webpack.EnvironmentPlugin(process.env));
    }
    return config;
  },
};

module.exports = nextConfig;
