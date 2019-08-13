import { declare } from "@babel/helper-plugin-utils";
import syntaxFlow from "@babel/plugin-syntax-flow";
import { types as t } from "@babel/core";
import generateCode from "@babel/generator";

export default declare(api => {
  api.assertVersion(7);

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
    if (!keepType && ofPath && ofPath.node) {
      // Removes the node at `ofPath` while conserving the comments attached
      // to it.
      const node = ofPath.node;
      const parent = ofPath.parentPath;
      const prev = ofPath.getPrevSibling();
      const next = ofPath.getNextSibling();
      const isSingleChild = !(prev.node || next.node);
      const leading = node.leadingComments;
      const trailing = node.trailingComments;

      if (isSingleChild && leading) {
        parent.addComments("inner", leading);
      }
      toPath.addComment(where, comment);
      ofPath.remove();
      if (isSingleChild && trailing) {
        parent.addComments("inner", trailing);
      }
    } else {
      toPath.addComment(where, comment);
    }
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
          typeParameters.remove();
        }

        let superTypeParametersComment = "";
        if (node.superTypeParameters) {
          const superTypeParameters = path.get("superTypeParameters");
          superTypeParametersComment = generateComment(
            superTypeParameters,
            superTypeParameters.node.optional,
          );
          superTypeParameters.remove();
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
