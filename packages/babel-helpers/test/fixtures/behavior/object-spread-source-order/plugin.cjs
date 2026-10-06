module.exports = function () {
  return { visitor: { Identifier(path) {
    if (path.node.name === "HELPER_OBJECT_SPREAD") path.replaceWith(this.addHelper("objectSpread2"));
  } } };
};
