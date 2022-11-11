// Todo (Babel 8): remove this file as Babel 8 drop support of core-js 2
module.exports = process.env.BABEL_8_BREAKING
  ? require("./data/corejs2-built-ins-next.json")
  : require("./data/corejs2-built-ins.json");
