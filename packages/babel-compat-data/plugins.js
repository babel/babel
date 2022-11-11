module.exports = process.env.BABEL_8_BREAKING
  ? require("./data/plugins-next.json")
  : require("./data/plugins.json");
