import { declare } from "@babel/helper-plugin-utils";
import type { types as t } from "@babel/core";
import regeneratorTransform from "regenerator-transform";

export default declare(({ types: t, assertVersion }) => {
  assertVersion(REQUIRED_VERSION(7));

  return {
    name: "transform-regenerator",

    inherits: regeneratorTransform.default,

    visitor: {
      // We visit CallExpression so that we always transform
      // regeneratorRuntime.*() before babel-plugin-polyfill-regenerator.
      CallExpression(path) {
        if (!process.env.BABEL_8_BREAKING) {
          if (!this.availableHelper?.("regeneratorRuntime")) {
            // When using an older @babel/helpers version, fallback
            // to the old behavior.
            // TODO: Remove this in Babel 8.
            return;
          }
        }

        const callee = path.get("callee");
        if (!callee.isMemberExpression()) return;

        const obj = callee.get("object");
        if (obj.isIdentifier({ name: "regeneratorRuntime" })) {
          const helper = this.addHelper("regeneratorRuntime") as
            | t.Identifier
            | t.ArrowFunctionExpression;

          if (!process.env.BABEL_8_BREAKING) {
            if (
              // TODO: Remove this in Babel 8, it's necessary to
              // avoid the IIFE when using older Babel versions.
              t.isArrowFunctionExpression(helper)
            ) {
              obj.replaceWith(helper.body);
              return;
            }
          }

          obj.replaceWith(t.callExpression(helper, []));

          if (process.env.BABEL_8_BREAKING) {
            if (
              callee.get("property").isIdentifier({ name: "mark" }) &&
              path.parentPath.isCallExpression() &&
              path.parentKey === "arguments" &&
              path.parentPath.getData(
                "@babel/helper-wrap-function/call-wrapped-function",
              )
            ) {
              const fnPath = path.findParent(p => p.isFunction());

              if (
                fnPath &&
                fnPath
                  .findParent(p => p.isLoop() || p.isFunction() || p.isClass())
                  ?.isLoop() !== true
              ) {
                const ref = path.scope.generateUidIdentifier("ref");
                fnPath.parentPath.scope.push({
                  id: ref,
                });
                const oldNode = path.node;
                const comments = path.node.leadingComments;
                if (comments) path.node.leadingComments = null;
                path.replaceWith(
                  t.assignmentExpression(
                    "=",
                    t.cloneNode(ref),
                    t.logicalExpression("||", t.cloneNode(ref), oldNode),
                  ),
                );
                if (comments) oldNode.leadingComments = comments;
              }
            }
          }
        }
      },
    },
  };
});
