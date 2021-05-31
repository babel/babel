module.exports = () => ({
  visitor: {
    ImportDeclaration(path) {
      path.node.source.value = "MODIFIED";
    },
  },
});
