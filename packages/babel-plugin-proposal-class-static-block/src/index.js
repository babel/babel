import { declare } from "@babel/helper-plugin-utils";
import syntaxClassStaticBlock from "@babel/plugin-syntax-class-static-block";

/**
 * Generate a uid that is not in `denyList`
 *
 * @param {*} scope
 * @param {Set<string>} a deny list that the generated uid should avoid
 * @returns
 */
function generateUid(scope, denyList: Set<string>) {
  const name = "";
  let uid;
  let i = 1;
  do {
    uid = scope._generateUid(name, i);
    i++;
  } while (denyList.has(uid));
  return uid;
}

export default declare(({ types: t, template, assertVersion }) => {
  // todo: change to ^7.12.0 when it is published
  assertVersion("^7.11.6");

  return {
    name: "proposal-class-static-block",
    inherits: syntaxClassStaticBlock,
    visitor: {
      Class(path: NodePath<Class>) {
        const { scope } = path;
        const classBody = path.get("body");
        const privateNames = new Set();
        let staticBlockPath;
        for (const path of classBody.get("body")) {
          if (path.isPrivate()) {
            privateNames.add(path.get("key.id").node.name);
          } else if (path.isStaticBlock()) {
            staticBlockPath = path;
          }
        }
        if (!staticBlockPath) {
          return;
        }
        const staticBlockRef = t.privateName(
          t.identifier(generateUid(scope, privateNames)),
        );
        classBody.pushContainer(
          "body",
          t.classPrivateProperty(
            staticBlockRef,
            template.expression.ast`(() => { ${staticBlockPath.node.body} })()`,
            [],
            /* static */ true,
          ),
        );
        staticBlockPath.remove();
      },
    },
  };
});
