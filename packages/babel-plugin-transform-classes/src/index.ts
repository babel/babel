import { declare } from "@babel/helper-plugin-utils";
import { isRequired } from "@babel/helper-compilation-targets";
import annotateAsPure from "@babel/helper-annotate-as-pure";
import { types as t } from "@babel/core";
import globals from "globals";
import transformClass from "./transformClass.ts";

const getBuiltinClasses = (category: keyof typeof globals) =>
  Object.keys(globals[category]).filter(name => /^[A-Z]/.test(name));

const builtinClasses = new Set([
  ...getBuiltinClasses("builtin"),
  ...getBuiltinClasses("browser"),
]);

export interface Options {
  loose?: boolean;
}

export default declare((api, options: Options) => {
  api.assertVersion(REQUIRED_VERSION(7));

  const { loose = false } = options;

  const setClassMethods = api.assumption("setClassMethods") ?? loose;
  const constantSuper = api.assumption("constantSuper") ?? loose;
  const superIsCallableConstructor =
    api.assumption("superIsCallableConstructor") ?? loose;
  const noClassCalls = api.assumption("noClassCalls") ?? loose;
  const supportUnicodeId = !isRequired(
    "transform-unicode-escapes",
    api.targets(),
  );

  // todo: investigate traversal requeueing
  const VISITED = new WeakSet();

  return {
    name: "transform-classes",

    visitor: {
      ExportDefaultDeclaration(path) {
        if (!path.get("declaration").isClassDeclaration()) return;
        if (!process.env.BABEL_8_BREAKING && !USE_ESM && !IS_STANDALONE) {
          // polyfill when being run by an older Babel version
          path.splitExportDeclaration ??=
            // eslint-disable-next-line no-restricted-globals
            require("@babel/traverse").NodePath.prototype.splitExportDeclaration;
        }
        path.splitExportDeclaration();
      },

      ClassDeclaration(path) {
        const { node } = path;

        const ref = node.id
          ? t.cloneNode(node.id)
          : path.scope.generateUidIdentifier("class");

        path.replaceWith(
          t.variableDeclaration("let", [
            t.variableDeclarator(ref, t.toExpression(node)),
          ]),
        );
      },

      ClassExpression(path, state) {
        const { node } = path;
        if (VISITED.has(node)) return;

        if (!process.env.BABEL_8_BREAKING && !USE_ESM && !IS_STANDALONE) {
          // polyfill when being run by an older Babel version
          path.ensureFunctionName ??=
            // eslint-disable-next-line no-restricted-globals
            require("@babel/traverse").NodePath.prototype.ensureFunctionName;
        }
        const replacement = path.ensureFunctionName(supportUnicodeId);
        if (replacement && replacement.node !== node) return;

        VISITED.add(node);

        const [replacedPath] = path.replaceWith(
          transformClass(
            path,
            state.file,
            builtinClasses,
            loose,
            {
              setClassMethods,
              constantSuper,
              superIsCallableConstructor,
              noClassCalls,
            },
            supportUnicodeId,
          ),
        );

        if (replacedPath.isCallExpression()) {
          annotateAsPure(replacedPath);
          const callee = replacedPath.get("callee");
          if (callee.isArrowFunctionExpression()) {
            // This is an IIFE, so we don't need to worry about the noNewArrows assumption
            callee.arrowFunctionToExpression();
          }
        }
      },
    },
  };
});
