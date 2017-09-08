import template from "babel-template";
import {
  rewriteModuleStatementsAndPrepareHeader,
  hasExports,
  getSourceMetadataArray,
  buildNamespaceInitStatements,
  ensureStatementsHoisted,
  wrapInterop,
} from "babel-helper-modules";

const buildWrapper = template(`
  define(MODULE_NAME, AMD_ARGUMENTS, function(IMPORT_NAMES) {
  })
`);

export default function({ types: t }) {
  return {
    visitor: {
      Program: {
        exit(path, state) {
          const {
            loose,
            allowTopLevelThis,
            strict,
            strictMode,
            noInterop,
          } = state.opts;

          let moduleName = this.getModuleName();
          if (moduleName) moduleName = t.stringLiteral(moduleName);

          const {
            meta,
            headers,
          } = rewriteModuleStatementsAndPrepareHeader(path, {
            loose,
            strict,
            strictMode,
            allowTopLevelThis,
            noInterop,
          });

          const amdArgs = [];
          const commonjsArgs = [];
          const importNames = [];

          if (hasExports(meta)) {
            amdArgs.push(t.stringLiteral("exports"));
            commonjsArgs.push(t.identifier("exports"));

            importNames.push(t.identifier(meta.exportName));
          }

          getSourceMetadataArray(
            meta,
          ).forEach(([source, metadata, , inSideEffectBlock]) => {
            amdArgs.push(t.stringLiteral(source));
            commonjsArgs.push(
              t.callExpression(t.identifier("require"), [
                t.stringLiteral(source),
              ]),
            );

            if (!inSideEffectBlock) {
              importNames.push(t.identifier(metadata.name));

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

            headers.push(...buildNamespaceInitStatements(meta, metadata));
          });

          ensureStatementsHoisted(headers);
          path.unshiftContainer("body", headers);

          const { body, directives } = path.node;
          path.node.directives = [];
          path.node.body = [];
          const amdWrapper = path.pushContainer("body", [
            buildWrapper({
              MODULE_NAME: moduleName,

              AMD_ARGUMENTS: t.arrayExpression(amdArgs),
              COMMONJS_ARGUMENTS: commonjsArgs,
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
