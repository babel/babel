export default function () {
  return {
    metadata: {
      group: "builtin-pre"
    },

    visitor: {
      VariableDeclaration(node) {
        if (!this.inList) return;

        while (true) {
          var sibling = this.getSibling(this.key + 1);
          if (!sibling.isVariableDeclaration({ kind: node.kind })) break;

          node.declarations = node.declarations.concat(sibling.node.declarations);
          sibling.dangerouslyRemove();
        }
      }
    }
  };
}
