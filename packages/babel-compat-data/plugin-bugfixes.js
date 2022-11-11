module.exports = process.env.BABEL_8_BREAKING
  ? require("./data/plugin-bugfixes-next.json")
  : require("./data/plugin-bugfixes.json");
