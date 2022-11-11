module.exports = process.env.BABEL_8_BREAKING
  ? require("./data/overlapping-plugins-next.json")
  : require("./data/overlapping-plugins.json");
