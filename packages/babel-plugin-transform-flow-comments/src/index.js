export default function ({ types: t }) {
  function wrapInFlowComment(path, parent) {
    path.addComment("trailing", generateComment(path, parent));
    path.replaceWith(t.noop());
  }

  // https://github.com/babel-plugins/babel-plugin-flow-comments/pull/6#issuecomment-122709012
  function escapeSource(source) {
    return source.replace(/\*-\//g, "*-ESCAPED/").replace(/\*\//g, "*-/");
  }

  function getSource(path) {
    if (path.isClassProperty()) {
      return (path.node.static ? "static " : "") + path.get("key").getSource() + path.get("typeAnnotation").getSource();
    } else {
      return path.getSource();
    }
  }

  function generateComment(path, parent) {
    let comment = escapeSource(getSource(path));
    if (parent && parent.optional) comment = "?" + comment;
    if (comment[0] !== ":") comment = ":: " + comment;
    return comment;
  }

  return {
    inherits: require("babel-plugin-syntax-flow"),

    visitor: {
      TypeCastExpression(path) {
        let { node } = path;
        path.get("expression").addComment("trailing", generateComment(path.get("typeAnnotation")));
        path.replaceWith(t.parenthesizedExpression(node.expression));
      },

      // support function a(b?) {}
      Identifier(path) {
        let { node } = path;
        if (!node.optional || node.typeAnnotation) {
          return;
        }
        path.addComment("trailing", ":: ?");
      },

      // strip optional property from function params - facebook/fbjs#17
      Function: {
        exit({ node }) {
          node.params.forEach((param) => param.optional = false);
        }
      },

      // support for `class X { foo: string }` - #4622
      Class(path) {
        path.get("body.body").forEach((child) => {
          if (!child.isClassProperty()) return;

          // class X { a }
          if (!child.node.typeAnnotation && !child.node.value) {
            child.replaceWith(t.noop());
            return;
          }

          if (child.node.typeAnnotation) {
            if (child.node.value) {
              // class X { a: number = 2 }
              child.addComment("trailing", generateComment(child));
            } else {
              // class X { a: number }
              wrapInFlowComment(child);
            }
            child.node.typeAnnotation = null;
          }
        });
      },

      // support `export type a = {}` - #8 Error: You passed path.replaceWith() a falsy node
      "ExportNamedDeclaration|Flow"(path) {
        let { node, parent } = path;
        if (t.isExportNamedDeclaration(node) && !t.isFlow(node.declaration)) {
          return;
        }
        wrapInFlowComment(path, parent);
      },

      // support `import type A` and `import typeof A` #10
      ImportDeclaration(path) {
        let { node, parent } = path;
        if (t.isImportDeclaration(node) && node.importKind !== "type" && node.importKind !== "typeof") {
          return;
        }
        wrapInFlowComment(path, parent);
      }
    }
  };
}
