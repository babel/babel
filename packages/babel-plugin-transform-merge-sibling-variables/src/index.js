export default function () {
  return {
    visitor: {
      VariableDeclaration(path) {
        if (!path.inList) return;

        let { node } = path;

        while (true) {
          let sibling = path.getSibling(path.key + 1);
          if (!sibling.isVariableDeclaration({ kind: node.kind })) break;

          node.declarations = node.declarations.concat(sibling.node.declarations);
          sibling.remove();
        }
      }
    }
  };
}
