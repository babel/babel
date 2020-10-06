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
  let i = 0;
  do {
    uid = scope._generateUid(name, i);
    i++;
  } while (denyList.has(uid));
  return uid;
}

/**
 * Get private names defined in current class body
 *
 * @param {NodePath<ClassBody>} classBody
 * @returns {Set<string>} A set of defined private names
 */
function getPrivateNames(classBody: NodePath<ClassBody>): Set<string> {
  const privateNames = new Set();
  for (const path of classBody.get("body")) {
    if (path.isPrivate()) {
      privateNames.add(path.get("key.id").node.name);
    }
  }
  return privateNames;
}

export default declare(({ types: t, template, assertVersion }) => {
  // todo remove this check after Babel 7.12.0 is published
  if (process.env.NODE_ENV !== "test") {
    assertVersion("^7.12.0");
  }

  return {
    name: "proposal-class-static-block",
    inherits: syntaxClassStaticBlock,
    visitor: {
      StaticBlock(path: NodePath<StaticBlock>) {
        const { parentPath: classBody, scope } = path;
        const staticBlockRef = t.privateName(
          t.identifier(generateUid(scope, getPrivateNames(classBody))),
        );
        classBody.pushContainer(
          "body",
          t.classPrivateProperty(
            staticBlockRef,
            template.expression.ast`(() => { ${path.node.body} })()`,
            [],
            /* static */ true,
          ),
        );
        path.remove();
      },
    },
  };
});
