/* eslint max-len: 0 */

import { basename, extname } from "path";
import { default as transformES2015ModulesAMD } from "babel-plugin-transform-es2015-modules-amd";
import template from "babel-template";

let buildPrerequisiteAssignment = template(`
  GLOBAL_REFERENCE = GLOBAL_REFERENCE || {}
`);

let buildGlobalExport = template(`
  var mod = { exports: {} };
  factory(BROWSER_ARGUMENTS);
  PREREQUISITE_ASSIGNMENTS
  GLOBAL_TO_ASSIGN = mod.exports;
`);

let buildWrapper = template(`
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(MODULE_NAME, AMD_ARGUMENTS, factory);
    } else if (typeof exports !== "undefined") {
      factory(COMMON_ARGUMENTS);
    } else {
      GLOBAL_EXPORT
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
    inherits: transformES2015ModulesAMD,

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
                  memberExpression = globalRef.split(".").reduce(
                    (accum, curr) => t.memberExpression(accum, t.identifier(curr)), t.identifier("global")
                  );
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

          let moduleNameOrBasename = moduleName ? moduleName.value : this.file.opts.basename;
          let globalToAssign = t.memberExpression(
            t.identifier("global"), t.identifier(t.toIdentifier(moduleNameOrBasename))
          );
          let prerequisiteAssignments = null;

          if (state.opts.exactGlobals) {
            let globalName = browserGlobals[moduleNameOrBasename];

            if (globalName) {
              prerequisiteAssignments = [];

              let members = globalName.split(".");
              globalToAssign = members.slice(1).reduce((accum, curr) => {
                prerequisiteAssignments.push(buildPrerequisiteAssignment({ GLOBAL_REFERENCE: accum }));
                return t.memberExpression(accum, t.identifier(curr));
              }, t.memberExpression(t.identifier("global"), t.identifier(members[0])));
            }
          }

          let globalExport = buildGlobalExport({
            BROWSER_ARGUMENTS: browserArgs,
            PREREQUISITE_ASSIGNMENTS: prerequisiteAssignments,
            GLOBAL_TO_ASSIGN: globalToAssign
          });

          last.replaceWith(buildWrapper({
            MODULE_NAME: moduleName,
            AMD_ARGUMENTS: amdArgs,
            COMMON_ARGUMENTS: commonArgs,
            GLOBAL_EXPORT: globalExport,
            FUNC: func
          }));
        }
      }
    }
  };
}
