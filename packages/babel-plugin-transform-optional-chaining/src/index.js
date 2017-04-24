import createTemplate from "babel-template";
import traverse from "babel-traverse";

const nullOrUndefinedCheck = createTemplate(`
  typeof CHECK !== "undefined" && CHECK !== null
    ? NEXT
    : null
`);

function isOptional(path) {
  return path.node.optional === true;
}

const nullOrUndefinedCheckVisitor = {
  noScope: true,

  Identifier(path, replacements) {
    if (path.node.name in replacements) {
      path.replaceInline(replacements[path.node.name]);
    }
  },
};

function createCheck(node, object) {

  const template = nullOrUndefinedCheck();

  traverse(template, nullOrUndefinedCheckVisitor, null, {
    CHECK: object,
    NEXT: node,
  });

  return template;
}

export default function ({ types: t }) {

  return {
    visitor: {
      MemberExpression(path) {

        if (isOptional(path)) {
          let { object } = path.node;

          while (
            t.isMemberExpression(object)
            && isOptional({ node: object })
          ) {
            object = createCheck(
              object,
              object.object
            );
          }

          path.replaceWith(
            createCheck(path.node, object)
          );

          path.stop();
        }
      },
    },
  };
}
