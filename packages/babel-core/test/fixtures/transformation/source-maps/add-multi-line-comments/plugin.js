module.exports = function () {
  return {
    visitor: {
      Program(path) {
        path.addComment("leading", "line1\nline2");
      },
    },
  };
};
