import { declare } from "@babel/helper-plugin-utils";
import type { Scope } from "@babel/core";

import {
  enableFeature,
  FEATURES,
} from "@babel/helper-create-class-features-plugin";

/**
 * Generate a uid that is not in `denyList`
 *
 * @param {Scope} scope
 * @param {Set<string>} denyList a deny list that the generated uid should avoid
 * @returns
 */
function generateUid(scope: Scope, denyList: Set<string>) {
  const name = "";
  let uid;
  let i = 1;
  do {
    uid = `_${name}`;
    if (i > 1) uid += i;
    i++;
  } while (denyList.has(uid));
  return uid;
}

export default declare(({ types: t, template, assertVersion, version }) => {
  assertVersion(REQUIRED_VERSION("^7.12.0"));

  return {
    name: "transform-class-static-block",
    inherits:
      USE_ESM || IS_STANDALONE || version[0] === "8"
        ? undefined
        : // eslint-disable-next-line no-restricted-globals
          require("@babel/plugin-syntax-class-static-block").default,

    pre() {
      // Enable this in @babel/helper-create-class-features-plugin, so that it
      // can be handled by the private fields and methods transform.
      enableFeature(this.file, FEATURES.staticBlocks, /* loose */ false);
    },

    visitor: {
      // Run on ClassBody and not on class so that if @babel/helper-create-class-features-plugin
      // is enabled it can generate optimized output without passing from the intermediate
      // private fields representation.
      ClassBody(classBody) {
        const { scope } = classBody;
        const privateNames = new Set<string>();
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

          let replacement;
          const blockBody = path.node.body;
          // We special-case the single expression case to avoid the iife, since
          // it's common.
          if (blockBody.length === 1 && t.isExpressionStatement(blockBody[0])) {
            replacement = t.inheritsComments(
              blockBody[0].expression,
              blockBody[0],
            );
          } else {
            replacement = template.expression.ast`(() => { ${blockBody} })()`;
          }

          path.replaceWith(
            t.classPrivateProperty(
              staticBlockRef,
              replacement,
              [],
              /* static */ true,
            ),
          );
        }
      },
    },
  };
});
