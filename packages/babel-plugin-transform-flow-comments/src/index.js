import { declare } from "@babel/helper-plugin-utils";
import syntaxFlow from "@babel/plugin-syntax-flow";
import { types as t } from "@babel/core";
import generateCode from "@babel/generator";

export default declare(api => {
  api.assertVersion(7);

  /**
   * Removes the node at the given path while conserving the comments attached
   * to it.
   * @param  {Path} path - The path of the node to remove
   */
  function removeTypeAnnotation(path) {
    const node = path.node;
    const parentPath = path.parentPath;
    const prevPath = path.getPrevSibling();
    const nextPath = path.getNextSibling();
    if (node.leadingComments && !prevPath.node) {
      if (prevPath.node) {
        nextPath.addComments("leading", node.leadingComments);
      } else {
        parentPath.addComments("inner", node.leadingComments);
      }
    }
    if (node.trailingComments && !nextPath.node) {
      if (prevPath.node) {
        prevPath.addComments("trailing", node.trailingComments);
      } else {
        parentPath.addComments("inner", node.trailingComments);
      }
    }
    path.remove();
  }

  function attachComment(path, comment) {
    let attach = path.getPrevSibling();
    let where = "trailing";
    if (!attach.node) {
      attach = path.getNextSibling();
      where = "leading";
    }
    if (!attach.node) {
      attach = path.parentPath;
      where = "inner";
    }
    removeTypeAnnotation(path);
    attach.addComment(where, comment);
  }

  function wrapInFlowComment(path, parent) {
    attachComment(path, generateComment(path, parent));
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

  function isTypeImport(importKind) {
    return importKind === "type" || importKind === "typeof";
  }

  return {
    name: "transform-flow-comments",
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
          removeTypeAnnotation(typeAnnotation);
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
          removeTypeAnnotation(returnType);
        }
        if (node.typeParameters) {
          const typeParameters = path.get("typeParameters");
          const id = path.get("id");
          id.addComment(
            "trailing",
            generateComment(typeParameters, typeParameters.node),
          );
          removeTypeAnnotation(typeParameters);
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
          removeTypeAnnotation(typeAnnotation);
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
        if (isTypeImport(node.importKind)) {
          wrapInFlowComment(path, parent);
          return;
        }

        const typeSpecifiers = node.specifiers.filter(specifier =>
          isTypeImport(specifier.importKind),
        );

        const nonTypeSpecifiers = node.specifiers.filter(
          specifier => !isTypeImport(specifier.importKind),
        );
        node.specifiers = nonTypeSpecifiers;

        if (typeSpecifiers.length > 0) {
          const typeImportNode = t.cloneNode(node);
          typeImportNode.specifiers = typeSpecifiers;

          if (nonTypeSpecifiers.length > 0) {
            path.addComment(
              "trailing",
              `:: ${generateCode(typeImportNode).code}`,
            );
          } else {
            attachComment(path, `:: ${generateCode(typeImportNode).code}`);
          }
        }
      },
      ObjectPattern(path) {
        const { node } = path;
        if (node.typeAnnotation) {
          const typeAnnotation = path.get("typeAnnotation");
          path.addComment(
            "trailing",
            generateComment(typeAnnotation, typeAnnotation.node),
          );
          removeTypeAnnotation(typeAnnotation);
        }
      },

      Flow(path) {
        const { parent } = path;
        wrapInFlowComment(path, parent);
      },

      Class(path) {
        const { node } = path;
        if (node.typeParameters || node.implements) {
          const comments = [];
          if (node.typeParameters) {
            const typeParameters = path.get("typeParameters");
            comments.push(
              generateComment(typeParameters, typeParameters.node).replace(
                /^:: /,
                "",
              ),
            );
            typeParameters.remove();
          }
          if (node.implements) {
            const impls = path.get("implements");
            comments.push(
              "implements " +
                impls
                  .map(impl => generateComment(impl).replace(/^:: /, ""))
                  .join(", "),
            );
            delete node["implements"];
          }

          const block = path.get("body");
          block.addComment("leading", ":: " + comments.join(" "));
        }
      },
    },
  };
});
