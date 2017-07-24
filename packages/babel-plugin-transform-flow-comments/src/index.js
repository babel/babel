import syntaxFlow from "babel-plugin-syntax-flow";

export default function({ types: t }) {
  function wrapInFlowComment(path, parent) {
    let attach = path.getPrevSibling();
    let where = "trailing";
    if (!attach.node) {
      attach = path.parentPath;
      where = "inner";
    }
    attach.addComment(where, generateComment(path, parent));
    path.remove();
  }

  function generateComment(path, parent) {
    let comment = path
      .getSource()
      .replace(/\*-\//g, "*-ESCAPED/")
      .replace(/\*\//g, "*-/");
    if (parent && parent.optional) comment = "?" + comment;
    if (comment[0] !== ":") comment = ":: " + comment;
    return comment;
  }

  return {
    inherits: syntaxFlow,

    visitor: {
      TypeCastExpression(path) {
        const { node } = path;
        path
          .get("expression")
          .addComment("trailing", generateComment(path.get("typeAnnotation")));
        path.replaceWith(t.parenthesizedExpression(node.expression));
      },

      // support function a(b?) {}
      Identifier(path) {
        if (path.parentPath.isFlow()) {
          return;
        }

        const { node } = path;
        if (node.typeAnnotation) {
          const typeAnnotation = path.get("typeAnnotation");
          path.addComment("trailing", generateComment(typeAnnotation, node));
          typeAnnotation.remove();
          if (node.optional) {
            node.optional = false;
          }
        } else if (node.optional) {
          path.addComment("trailing", ":: ?");
          node.optional = false;
        }
      },

      AssignmentPattern: {
        exit({ node }) {
          const { left } = node;
          if (left.optional) {
            left.optional = false;
          }
        },
      },

      // strip optional property from function params - facebook/fbjs#17
      Function(path) {
        if (path.isDeclareFunction()) return;
        const { node } = path;
        if (node.returnType) {
          const returnType = path.get("returnType");
          const typeAnnotation = returnType.get("typeAnnotation");
          const block = path.get("body");
          block.addComment(
            "leading",
            generateComment(returnType, typeAnnotation.node),
          );
          returnType.remove();
        }
        if (node.typeParameters) {
          const typeParameters = path.get("typeParameters");
          const id = path.get("id");
          id.addComment(
            "trailing",
            generateComment(typeParameters, typeParameters.node),
          );
          typeParameters.remove();
        }
      },

      // support for `class X { foo: string }` - #4622
      ClassProperty(path) {
        const { node, parent } = path;
        if (!node.value) {
          wrapInFlowComment(path, parent);
        } else if (node.typeAnnotation) {
          const typeAnnotation = path.get("typeAnnotation");
          path
            .get("key")
            .addComment(
              "trailing",
              generateComment(typeAnnotation, typeAnnotation.node),
            );
          typeAnnotation.remove();
        }
      },

      // support `export type a = {}` - #8 Error: You passed path.replaceWith() a falsy node
      ExportNamedDeclaration(path) {
        const { node, parent } = path;
        if (node.exportKind !== "type" && !t.isFlow(node.declaration)) {
          return;
        }
        wrapInFlowComment(path, parent);
      },

      // support `import type A` and `import typeof A` #10
      ImportDeclaration(path) {
        const { node, parent } = path;
        if (node.importKind !== "type" && node.importKind !== "typeof") {
          return;
        }
        wrapInFlowComment(path, parent);
      },

      Flow(path) {
        const { parent } = path;
        wrapInFlowComment(path, parent);
      },

      Class(path) {
        const { node } = path;
        if (node.typeParameters) {
          const typeParameters = path.get("typeParameters");
          const block = path.get("body");
          block.addComment(
            "leading",
            generateComment(typeParameters, typeParameters.node),
          );
          typeParameters.remove();
        }
      },
    },
  };
}
