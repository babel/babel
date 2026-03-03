const createPlugin = require("@babel/plugin-transform-react-jsx/lib/create-plugin").default;

module.exports = createPlugin({
  name: "transform-react-jsx/development",
  development: true,
  developmentSourceSelf: true,
});
