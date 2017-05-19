module.exports = function (babel) {
  return {
    "visitor": {
      "Function": function (path) {
        path.inlineParameters();
      }
    }
  }
}
