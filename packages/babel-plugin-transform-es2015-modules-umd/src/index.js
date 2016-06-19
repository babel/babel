/* eslint max-len: 0 */

import { basename, extname } from "path";
import template from "babel-template";

let buildWrapper = template(`
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(MODULE_NAME, AMD_ARGUMENTS, factory);
    } else if (typeof exports !== "undefined") {
      factory(COMMON_ARGUMENTS);
    } else {
      var mod = { exports: {} };
      factory(BROWSER_ARGUMENTS);
      global.GLOBAL_ARG = mod.exports;
    }
  })(this, FUNC);
`);

export default function ({ types: t }) {
  function isValidDefine(path) {
    if (!path.isExpressionStatement()) return;

    let expr = path.get("expression");
    if (!expr.isCallExpression()) return false;
    if (!expr.get("callee").isIdentifier({ name: "define" })) return false;

    let args = expr.get("arguments");
    if (args.length === 3 && !args.shift().isStringLiteral()) return false;
    if (args.length !== 2) return false;
    if (!args.shift().isArrayExpression()) return false;
    if (!args.shift().isFunctionExpression()) return false;

    return true;
  }

  return {
    inherits: require("babel-plugin-transform-es2015-modules-amd"),

    visitor: {
      Program: {
        exit(path, state) {
          let last = path.get("body").pop();
          if (!isValidDefine(last)) return;

          let call = last.node.expression;
          let args = call.arguments;

          let moduleName = args.length === 3 ? args.shift() : null;
          let amdArgs = call.arguments[0];
          let func = call.arguments[1];
          let browserGlobals = state.opts.globals || {};

          let commonArgs = amdArgs.elements.map((arg) => {
            if (arg.value === "module" || arg.value === "exports") {
              return t.identifier(arg.value);
            } else {
              return t.callExpression(t.identifier("require"), [arg]);
            }
          });

          let browserArgs = amdArgs.elements.map((arg) => {
            if (arg.value === "module") {
              return t.identifier("mod");
            } else if (arg.value === "exports") {
              return t.memberExpression(t.identifier("mod"), t.identifier("exports"));
            } else {
              let memberExpression;

              if (state.opts.exactGlobals) {
                let globalRef = browserGlobals[arg.value];
                if (globalRef) {
                  if (globalRef.indexOf(".") > -1) {
                    memberExpression = globalRef.split(".").reduce(
                      (accum, curr) => t.memberExpression(accum, t.identifier(curr)), t.identifier("global")
                    );
                  } else {
                    memberExpression = t.memberExpression(t.identifier("global"), t.identifier(globalRef));
                  }
                } else {
                  memberExpression = t.memberExpression(
                    t.identifier("global"), t.identifier(t.toIdentifier(arg.value))
                  );
                }
              } else {
                let requireName = basename(arg.value, extname(arg.value));
                let globalName = browserGlobals[requireName] || requireName;
                memberExpression = t.memberExpression(
                  t.identifier("global"), t.identifier(t.toIdentifier(globalName))
                );
              }

              return memberExpression;
            }
          });

          let globalArg = t.identifier(t.toIdentifier(moduleName ? moduleName.value : this.file.opts.basename));

          last.replaceWith(buildWrapper({
            MODULE_NAME: moduleName,
            BROWSER_ARGUMENTS: browserArgs,
            AMD_ARGUMENTS: amdArgs,
            COMMON_ARGUMENTS: commonArgs,
            GLOBAL_ARG: globalArg,
            FUNC: func
          }));
        }
      }
    }
  };
}
