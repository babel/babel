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

  function attachComment({
    ofPath,
    toPath,
    where = "trailing",
    optional = false,
    comment = generateComment(ofPath, optional),
    keepType = false,
  }) {
    if (!toPath || !toPath.node) {
      toPath = ofPath.getPrevSibling();
      where = "trailing";
    }
    if (!toPath.node) {
      toPath = ofPath.getNextSibling();
      where = "leading";
    }
    if (!toPath.node) {
      toPath = ofPath.parentPath;
      where = "inner";
    }
    if (ofPath && !keepType) {
      removeTypeAnnotation(ofPath);
    }
    toPath.addComment(where, comment);
  }

  function wrapInFlowComment(path) {
    attachComment({
      ofPath: path,
      comment: generateComment(path, path.parent.optional),
    });
  }

  function generateComment(path, optional) {
    let comment = path
      .getSource()
      .replace(/\*-\//g, "*-ESCAPED/")
      .replace(/\*\//g, "*-/");
    if (optional) comment = "?" + comment;
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
        attachComment({
          ofPath: path.get("typeAnnotation"),
          toPath: path.get("expression"),
          keepType: true,
        });
        path.replaceWith(t.parenthesizedExpression(node.expression));
      },

      // support function a(b?) {}
      Identifier(path) {
        if (path.parentPath.isFlow()) return;
        const { node } = path;
        if (node.typeAnnotation) {
          attachComment({
            ofPath: path.get("typeAnnotation"),
            toPath: path,
            optional: node.optional || node.typeAnnotation.optional,
          });
          if (node.optional) {
            node.optional = false;
          }
        } else if (node.optional) {
          attachComment({
            toPath: path,
            comment: ":: ?",
          });
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
        if (node.typeParameters) {
          attachComment({
            ofPath: path.get("typeParameters"),
            toPath: path.get("id"),
            optional: node.typeParameters.optional,
          });
        }
        if (node.returnType) {
          attachComment({
            ofPath: path.get("returnType"),
            toPath: path.get("body"),
            where: "leading",
            optional: node.returnType.typeAnnotation.optional,
          });
        }
      },

      // support for `class X { foo: string }` - #4622
      ClassProperty(path) {
        const { node } = path;
        if (!node.value) {
          wrapInFlowComment(path);
        } else if (node.typeAnnotation) {
          attachComment({
            ofPath: path.get("typeAnnotation"),
            toPath: path.get("key"),
            optional: node.typeAnnotation.optional,
          });
        }
      },

      // support `export type a = {}` - #8 Error: You passed path.replaceWith() a falsy node
      ExportNamedDeclaration(path) {
        const { node } = path;
        if (node.exportKind !== "type" && !t.isFlow(node.declaration)) {
          return;
        }
        wrapInFlowComment(path);
      },

      // support `import type A` and `import typeof A` #10
      ImportDeclaration(path) {
        const { node } = path;
        if (isTypeImport(node.importKind)) {
          wrapInFlowComment(path);
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
          const comment = `:: ${generateCode(typeImportNode).code}`;

          if (nonTypeSpecifiers.length > 0) {
            attachComment({ toPath: path, comment });
          } else {
            attachComment({ ofPath: path, comment });
          }
        }
      },
      ObjectPattern(path) {
        const { node } = path;
        if (node.typeAnnotation) {
          attachComment({
            ofPath: path.get("typeAnnotation"),
            toPath: path,
            optional: node.optional || node.typeAnnotation.optional,
          });
        }
      },

      Flow(path) {
        wrapInFlowComment(path);
      },

      Class(path) {
        const { node } = path;
        let typeParametersComment = "";
        if (node.typeParameters) {
          const typeParameters = path.get("typeParameters");
          typeParametersComment = generateComment(
            typeParameters,
            typeParameters.node.optional,
          );
          removeTypeAnnotation(typeParameters);
        }

        let superTypeParametersComment = "";
        if (node.superTypeParameters) {
          const superTypeParameters = path.get("superTypeParameters");
          superTypeParametersComment = generateComment(
            superTypeParameters,
            superTypeParameters.node.optional,
          );
          removeTypeAnnotation(superTypeParameters);
        }

        let implementsComment = "";
        if (node.implements) {
          const impls = path.get("implements");
          implementsComment =
            "implements " +
            impls
              .map(impl => generateComment(impl).replace(/^:: /, ""))
              .join(", ");
          delete node["implements"];
        }

        let bodyComment = "";
        if (node.superClass) {
          if (typeParametersComment) {
            attachComment({
              toPath: path.get("id"),
              comment: typeParametersComment,
            });
          }
          bodyComment = superTypeParametersComment;
        } else {
          bodyComment = typeParametersComment;
        }
        if (implementsComment) {
          if (bodyComment) {
            bodyComment += ` ${implementsComment}`;
          } else {
            bodyComment = `:: ${implementsComment}`;
          }
        }
        if (bodyComment) {
          attachComment({
            toPath: path.get("body"),
            where: "leading",
            comment: bodyComment,
          });
        }
      },
    },
  };
});
