export default function({ types: t }) {
  return {
    visitor: {
      "BindingIdentifier|ReferencedIdentifier"(path) {
        if (!t.isValidES3Identifier(path.node.name)) {
          path.scope.rename(path.node.name);
        }
      },
    },
  };
}
