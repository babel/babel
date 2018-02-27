import { basename, extname } from "path";
import {
  isModule,
  rewriteModuleStatementsAndPrepareHeader,
  hasExports,
  isSideEffectImport,
  buildNamespaceInitStatements,
  ensureStatementsHoisted,
  wrapInterop,
} from "@babel/helper-module-transforms";
import { types as t, template } from "@babel/core";

const buildPrerequisiteAssignment = template(`
  GLOBAL_REFERENCE = GLOBAL_REFERENCE || {}
`);

const buildWrapper = template(`
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(MODULE_NAME, AMD_ARGUMENTS, factory);
    } else if (typeof exports !== "undefined") {
      factory(COMMONJS_ARGUMENTS);
    } else {
      var mod = { exports: {} };
      factory(BROWSER_ARGUMENTS);

      GLOBAL_TO_ASSIGN;
    }
  })(this, function(IMPORT_NAMES) {
  })
`);

export default function(api, options) {
  const {
    globals,
    exactGlobals,
    loose,
    allowTopLevelThis,
    strict,
    strictMode,
    noInterop,
  } = options;

  /**
   * Build the assignment statements that initialize the UMD global.
   */
  function buildBrowserInit(
    browserGlobals,
    exactGlobals,
    filename,
    moduleName,
  ) {
    const moduleNameOrBasename = moduleName
      ? moduleName.value
      : basename(filename, extname(filename));
    let globalToAssign = t.memberExpression(
      t.identifier("global"),
      t.identifier(t.toIdentifier(moduleNameOrBasename)),
    );
    let initAssignments = [];

    if (exactGlobals) {
      const globalName = browserGlobals[moduleNameOrBasename];

      if (globalName) {
        initAssignments = [];

        const members = globalName.split(".");
        globalToAssign = members.slice(1).reduce((accum, curr) => {
          initAssignments.push(
            buildPrerequisiteAssignment({
              GLOBAL_REFERENCE: t.cloneNode(accum),
            }),
          );
          return t.memberExpression(accum, t.identifier(curr));
        }, t.memberExpression(t.identifier("global"), t.identifier(members[0])));
      }
    }

    initAssignments.push(
      t.expressionStatement(
        t.assignmentExpression(
          "=",
          globalToAssign,
          t.memberExpression(t.identifier("mod"), t.identifier("exports")),
        ),
      ),
    );

    return initAssignments;
  }

  /**
   * Build the member expression that reads from a global for a given source.
   */
  function buildBrowserArg(browserGlobals, exactGlobals, source) {
    let memberExpression;
    if (exactGlobals) {
      const globalRef = browserGlobals[source];
      if (globalRef) {
        memberExpression = globalRef
          .split(".")
          .reduce(
            (accum, curr) => t.memberExpression(accum, t.identifier(curr)),
            t.identifier("global"),
          );
      } else {
        memberExpression = t.memberExpression(
          t.identifier("global"),
          t.identifier(t.toIdentifier(source)),
        );
      }
    } else {
      const requireName = basename(source, extname(source));
      const globalName = browserGlobals[requireName] || requireName;
      memberExpression = t.memberExpression(
        t.identifier("global"),
        t.identifier(t.toIdentifier(globalName)),
      );
    }
    return memberExpression;
  }

  return {
    visitor: {
      Program: {
        exit(path) {
          if (!isModule(path)) return;

          const browserGlobals = globals || {};

          let moduleName = this.getModuleName();
          if (moduleName) moduleName = t.stringLiteral(moduleName);

          const { meta, headers } = rewriteModuleStatementsAndPrepareHeader(
            path,
            {
              loose,
              strict,
              strictMode,
              allowTopLevelThis,
              noInterop,
            },
          );

          const amdArgs = [];
          const commonjsArgs = [];
          const browserArgs = [];
          const importNames = [];

          if (hasExports(meta)) {
            amdArgs.push(t.stringLiteral("exports"));
            commonjsArgs.push(t.identifier("exports"));
            browserArgs.push(
              t.memberExpression(t.identifier("mod"), t.identifier("exports")),
            );
            importNames.push(t.identifier(meta.exportName));
          }

          for (const [source, metadata] of meta.source) {
            amdArgs.push(t.stringLiteral(source));
            commonjsArgs.push(
              t.callExpression(t.identifier("require"), [
                t.stringLiteral(source),
              ]),
            );
            browserArgs.push(
              buildBrowserArg(browserGlobals, exactGlobals, source),
            );
            importNames.push(t.identifier(metadata.name));

            if (!isSideEffectImport(metadata)) {
              const interop = wrapInterop(
                path,
                t.identifier(metadata.name),
                metadata.interop,
              );
              if (interop) {
                const header = t.expressionStatement(
                  t.assignmentExpression(
                    "=",
                    t.identifier(metadata.name),
                    interop,
                  ),
                );
                header.loc = meta.loc;
                headers.push(header);
              }
            }

            headers.push(
              ...buildNamespaceInitStatements(meta, metadata, loose),
            );
          }

          ensureStatementsHoisted(headers);
          path.unshiftContainer("body", headers);

          const { body, directives } = path.node;
          path.node.directives = [];
          path.node.body = [];
          const umdWrapper = path.pushContainer("body", [
            buildWrapper({
              MODULE_NAME: moduleName,

              AMD_ARGUMENTS: t.arrayExpression(amdArgs),
              COMMONJS_ARGUMENTS: commonjsArgs,
              BROWSER_ARGUMENTS: browserArgs,
              IMPORT_NAMES: importNames,

              GLOBAL_TO_ASSIGN: buildBrowserInit(
                browserGlobals,
                exactGlobals,
                this.filename || "unknown",
                moduleName,
              ),
            }),
          ])[0];
          const umdFactory = umdWrapper
            .get("expression.arguments")[1]
            .get("body");
          umdFactory.pushContainer("directives", directives);
          umdFactory.pushContainer("body", body);
        },
      },
    },
  };
}
