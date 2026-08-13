module.exports = function() {
  return {
    visitor: {
      Identifier(path) {
        if (path.node.name === "HELPER_ARRAY_WITH_HOLES") {
          const helper = this.addHelper("arrayWithHoles");
          path.replaceWith(helper);
        }
      },
    },
  };
};
