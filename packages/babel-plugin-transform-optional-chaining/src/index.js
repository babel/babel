import createTemplate from "babel-template";
import traverse from "babel-traverse";

const nullOrUndefinedCheck = createTemplate(`
  typeof CHECK !== "undefined" && CHECK !== null
    ? NEXT
    : null
`);

function isNodeOptional(node) {
  return node.optional === true;
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

        if (isNodeOptional(path.node)) {
          let { object } = path.node;

          do {
            object = createCheck(
              object,
              object.object
            );

          } while (t.isMemberExpression(object) && isNodeOptional(object));

          path.replaceWith(
            createCheck(path.node, object)
          );

          path.stop();
        }
      },
    },
  };
}
