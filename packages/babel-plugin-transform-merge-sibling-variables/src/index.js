export default function () {
  return {
    visitor: {
      VariableDeclaration(path) {
        if (!path.inList) return;

        var { node } = path;

        while (true) {
          var sibling = path.getSibling(path.key + 1);
          if (!sibling.isVariableDeclaration({ kind: node.kind })) break;

          node.declarations = node.declarations.concat(sibling.node.declarations);
          sibling.remove();
        }
      }
    }
  };
}
