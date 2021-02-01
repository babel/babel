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
  assertVersion("^7.12.0");

  return {
    name: "proposal-class-static-block",
    inherits: syntaxClassStaticBlock,
    visitor: {
      Class(path: NodePath<Class>) {
        const { scope } = path;
        const classBody = path.get("body");
        const privateNames = new Set();
        const body = classBody.get("body");
        for (const path of body) {
          if (path.isPrivate()) {
            privateNames.add(path.get("key.id").node.name);
          }
        }
        for (const path of body) {
          if (!path.isStaticBlock()) continue;
          const staticBlockPrivateId = generateUid(scope, privateNames);
          privateNames.add(staticBlockPrivateId);
          const staticBlockRef = t.privateName(
            t.identifier(staticBlockPrivateId),
          );
          path.replaceWith(
            t.classPrivateProperty(
              staticBlockRef,
              template.expression.ast`(() => { ${path.node.body} })()`,
              [],
              /* static */ true,
            ),
          );
        }
      },
    },
  };
});
