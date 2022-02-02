const withTM = require("next-transpile-modules")(["socket-model"]);
const intercept = require("intercept-stdout");

// @NOTE: https://github.com/facebookexperimental/Recoil/issues/733
intercept((text) => (text.includes("Duplicate atom key") ? "" : text));

module.exports = withTM({
  reactStrictMode: true,
  experimental: {
    styledComponents: true,
  },
  webpack: (config, { isServer, webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.NEXT_IS_SERVER": isServer,
      })
    );
    return config;
  },
});
