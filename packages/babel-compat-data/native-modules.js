module.exports = process.env.BABEL_8_BREAKING
  ? require("./data/native-modules-next.json")
  : require("./data/native-modules.json");
