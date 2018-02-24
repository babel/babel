import {
  isModule,
  rewriteModuleStatementsAndPrepareHeader,
  hasExports,
  isSideEffectImport,
  buildNamespaceInitStatements,
  ensureStatementsHoisted,
  wrapInterop,
} from "@babel/helper-module-transforms";
import { template, types as t } from "@babel/core";

const buildWrapper = template(`
  define(MODULE_NAME, AMD_ARGUMENTS, function(IMPORT_NAMES) {
  })
`);

export default function(api, options) {
  const { loose, allowTopLevelThis, strict, strictMode, noInterop } = options;
  return {
    visitor: {
      Program: {
        exit(path) {
          if (!isModule(path)) return;

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
          const importNames = [];

          if (hasExports(meta)) {
            amdArgs.push(t.stringLiteral("exports"));

            importNames.push(t.identifier(meta.exportName));
          }

          for (const [source, metadata] of meta.source) {
            amdArgs.push(t.stringLiteral(source));
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
                header.loc = metadata.loc;
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
          const amdWrapper = path.pushContainer("body", [
            buildWrapper({
              MODULE_NAME: moduleName,

              AMD_ARGUMENTS: t.arrayExpression(amdArgs),
              IMPORT_NAMES: importNames,
            }),
          ])[0];
          const amdFactory = amdWrapper
            .get("expression.arguments")
            .filter(arg => arg.isFunctionExpression())[0]
            .get("body");
          amdFactory.pushContainer("directives", directives);
          amdFactory.pushContainer("body", body);
        },
      },
    },
  };
}
