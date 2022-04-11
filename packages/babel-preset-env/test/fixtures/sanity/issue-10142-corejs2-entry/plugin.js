module.exports = () => ({
  visitor: {
    ImportDeclaration(path) {
      if (path.node.source.value === "core-js") return;
      path.node.source.value = "MODIFIED";
    },
  },
});
