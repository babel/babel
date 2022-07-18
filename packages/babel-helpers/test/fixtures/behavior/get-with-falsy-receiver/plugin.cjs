module.exports = function() {
  return {
    visitor: {
      Identifier(path) {
        if (path.node.name === "HELPER_GET") {
          const helper = this.addHelper("get");
          path.replaceWith(helper);
        }
      },
    },
  };
};
