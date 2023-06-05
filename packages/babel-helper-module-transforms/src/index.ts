import assert from "assert";
import { template, types as t } from "@babel/core";

import { isModule } from "@babel/helper-module-imports";

import rewriteThis from "./rewrite-this";
import rewriteLiveReferences from "./rewrite-live-references";
import normalizeModuleAndLoadMetadata, {
  hasExports,
  isSideEffectImport,
  validateImportInteropOption,
} from "./normalize-and-load-metadata";
import type {
  ImportInterop,
  InteropType,
  Lazy,
  ModuleMetadata,
  SourceModuleMetadata,
} from "./normalize-and-load-metadata";
import type { NodePath } from "@babel/traverse";

const {
  booleanLiteral,
  callExpression,
  cloneNode,
  directive,
  directiveLiteral,
  expressionStatement,
  identifier,
  isIdentifier,
  memberExpression,
  stringLiteral,
  valueToNode,
  variableDeclaration,
  variableDeclarator,
} = t;

export { buildDynamicImport } from "./dynamic-import";

if (!process.env.BABEL_8_BREAKING) {
  if (!USE_ESM) {
    if (!IS_STANDALONE) {
      // eslint-disable-next-line no-restricted-globals
      exports.getDynamicImportSource =
        // eslint-disable-next-line no-restricted-globals
        require("./dynamic-import").getDynamicImportSource;
    }
  }
}

export { default as getModuleName } from "./get-module-name";
export type { PluginOptions } from "./get-module-name";

export { hasExports, isSideEffectImport, isModule, rewriteThis };

export interface RewriteModuleStatementsAndPrepareHeaderOptions {
  exportName?: string;
  strict: boolean;
  allowTopLevelThis?: boolean;
  strictMode: boolean;
  loose?: boolean;
  importInterop?: ImportInterop;
  noInterop?: boolean;
  lazy?: Lazy;
  esNamespaceOnly?: boolean;
  filename: string | undefined;
  constantReexports?: boolean | void;
  enumerableModuleMeta?: boolean | void;
  noIncompleteNsImportDetection?: boolean | void;
}

/**
 * Perform all of the generic ES6 module rewriting needed to handle initial
 * module processing. This function will rewrite the majority of the given
 * program to reference the modules described by the returned metadata,
 * and returns a list of statements for use when initializing the module.
 */
export function rewriteModuleStatementsAndPrepareHeader(
  path: NodePath<t.Program>,
  {
    exportName,
    strict,
    allowTopLevelThis,
    strictMode,
    noInterop,
    importInterop = noInterop ? "none" : "babel",
    lazy,
    esNamespaceOnly,
    filename,

    constantReexports = process.env.BABEL_8_BREAKING
      ? undefined
      : arguments[1].loose,
    enumerableModuleMeta = process.env.BABEL_8_BREAKING
      ? undefined
      : arguments[1].loose,
    noIncompleteNsImportDetection,
  }: RewriteModuleStatementsAndPrepareHeaderOptions,
) {
  validateImportInteropOption(importInterop);
  assert(isModule(path), "Cannot process module statements in a script");
  path.node.sourceType = "script";

  const meta = normalizeModuleAndLoadMetadata(path, exportName, {
    importInterop,
    initializeReexports: constantReexports,
    lazy,
    esNamespaceOnly,
    filename,
  });

  if (!allowTopLevelThis) {
    rewriteThis(path);
  }

  rewriteLiveReferences(path, meta);

  if (strictMode !== false) {
    const hasStrict = path.node.directives.some(directive => {
      return directive.value.value === "use strict";
    });
    if (!hasStrict) {
      path.unshiftContainer(
        "directives",
        directive(directiveLiteral("use strict")),
      );
    }
  }

  const headers = [];
  if (hasExports(meta) && !strict) {
    headers.push(buildESModuleHeader(meta, enumerableModuleMeta));
  }

  const nameList = buildExportNameListDeclaration(path, meta);

  if (nameList) {
    meta.exportNameListName = nameList.name;
    headers.push(nameList.statement);
  }

  // Create all of the statically known named exports.
  headers.push(
    ...buildExportInitializationStatements(
      path,
      meta,
      constantReexports,
      noIncompleteNsImportDetection,
    ),
  );

  return { meta, headers };
}

/**
 * Flag a set of statements as hoisted above all else so that module init
 * statements all run before user code.
 */
export function ensureStatementsHoisted(statements: t.Statement[]) {
  // Force all of the header fields to be at the top of the file.
  statements.forEach(header => {
    // @ts-expect-error Fixme: handle _blockHoist property
    header._blockHoist = 3;
  });
}

/**
 * Given an expression for a standard import object, like "require('foo')",
 * wrap it in a call to the interop helpers based on the type.
 */
export function wrapInterop(
  programPath: NodePath<t.Program>,
  expr: t.Expression,
  type: InteropType,
): t.CallExpression {
  if (type === "none") {
    return null;
  }

  if (type === "node-namespace") {
    return callExpression(programPath.hub.addHelper("interopRequireWildcard"), [
      expr,
      booleanLiteral(true),
    ]);
  } else if (type === "node-default") {
    return null;
  }

  let helper;
  if (type === "default") {
    helper = "interopRequireDefault";
  } else if (type === "namespace") {
    helper = "interopRequireWildcard";
  } else {
    throw new Error(`Unknown interop: ${type}`);
  }

  return callExpression(programPath.hub.addHelper(helper), [expr]);
}

/**
 * Create the runtime initialization statements for a given requested source.
 * These will initialize all of the runtime import/export logic that
 * can't be handled statically by the statements created by
 * buildExportInitializationStatements().
 */
export function buildNamespaceInitStatements(
  metadata: ModuleMetadata,
  sourceMetadata: SourceModuleMetadata,
  constantReexports: boolean | void = false,
) {
  const statements = [];

  let srcNamespace: t.Node = identifier(sourceMetadata.name);
  if (sourceMetadata.lazy) srcNamespace = callExpression(srcNamespace, []);

  for (const localName of sourceMetadata.importsNamespace) {
    if (localName === sourceMetadata.name) continue;

    // Create and assign binding to namespace object
    statements.push(
      template.statement`var NAME = SOURCE;`({
        NAME: localName,
        SOURCE: cloneNode(srcNamespace),
      }),
    );
  }
  if (constantReexports) {
    statements.push(...buildReexportsFromMeta(metadata, sourceMetadata, true));
  }
  for (const exportName of sourceMetadata.reexportNamespace) {
    // Assign export to namespace object.
    statements.push(
      (sourceMetadata.lazy
        ? template.statement`
            Object.defineProperty(EXPORTS, "NAME", {
              enumerable: true,
              get: function() {
                return NAMESPACE;
              }
            });
          `
        : template.statement`EXPORTS.NAME = NAMESPACE;`)({
        EXPORTS: metadata.exportName,
        NAME: exportName,
        NAMESPACE: cloneNode(srcNamespace),
      }),
    );
  }
  if (sourceMetadata.reexportAll) {
    const statement = buildNamespaceReexport(
      metadata,
      cloneNode(srcNamespace),
      constantReexports,
    );
    statement.loc = sourceMetadata.reexportAll.loc;

    // Iterate props creating getter for each prop.
    statements.push(statement);
  }
  return statements;
}

const ReexportTemplate = {
  constant: template.statement`EXPORTS.EXPORT_NAME = NAMESPACE_IMPORT;`,
  constantComputed: template.statement`EXPORTS["EXPORT_NAME"] = NAMESPACE_IMPORT;`,
  spec: template.statement`
    Object.defineProperty(EXPORTS, "EXPORT_NAME", {
      enumerable: true,
      get: function() {
        return NAMESPACE_IMPORT;
      },
    });
    `,
};

function buildReexportsFromMeta(
  meta: ModuleMetadata,
  metadata: SourceModuleMetadata,
  constantReexports: boolean,
) {
  const namespace = metadata.lazy
    ? callExpression(identifier(metadata.name), [])
    : identifier(metadata.name);

  const { stringSpecifiers } = meta;
  return Array.from(metadata.reexports, ([exportName, importName]) => {
    let NAMESPACE_IMPORT: t.Expression = cloneNode(namespace);
    if (importName === "default" && metadata.interop === "node-default") {
      // Nothing, it's ok as-is
    } else if (stringSpecifiers.has(importName)) {
      NAMESPACE_IMPORT = memberExpression(
        NAMESPACE_IMPORT,
        stringLiteral(importName),
        true,
      );
    } else {
      NAMESPACE_IMPORT = memberExpression(
        NAMESPACE_IMPORT,
        identifier(importName),
      );
    }
    const astNodes = {
      EXPORTS: meta.exportName,
      EXPORT_NAME: exportName,
      NAMESPACE_IMPORT,
    };
    if (constantReexports || isIdentifier(NAMESPACE_IMPORT)) {
      if (stringSpecifiers.has(exportName)) {
        return ReexportTemplate.constantComputed(astNodes);
      } else {
        return ReexportTemplate.constant(astNodes);
      }
    } else {
      return ReexportTemplate.spec(astNodes);
    }
  });
}

/**
 * Build an "__esModule" header statement setting the property on a given object.
 */
function buildESModuleHeader(
  metadata: ModuleMetadata,
  enumerableModuleMeta: boolean | void = false,
) {
  return (
    enumerableModuleMeta
      ? template.statement`
        EXPORTS.__esModule = true;
      `
      : template.statement`
        Object.defineProperty(EXPORTS, "__esModule", {
          value: true,
        });
      `
  )({ EXPORTS: metadata.exportName });
}

/**
 * Create a re-export initialization loop for a specific imported namespace.
 */
function buildNamespaceReexport(
  metadata: ModuleMetadata,
  namespace: t.Identifier | t.CallExpression,
  constantReexports: boolean | void,
) {
  return (
    constantReexports
      ? template.statement`
        Object.keys(NAMESPACE).forEach(function(key) {
          if (key === "default" || key === "__esModule") return;
          VERIFY_NAME_LIST;
          if (key in EXPORTS && EXPORTS[key] === NAMESPACE[key]) return;

          EXPORTS[key] = NAMESPACE[key];
        });
      `
      : // Also skip already assigned bindings if they are strictly equal
        // to be somewhat more spec-compliant when a file has multiple
        // namespace re-exports that would cause a binding to be exported
        // multiple times. However, multiple bindings of the same name that
        // export the same primitive value are silently skipped
        // (the spec requires an "ambiguous bindings" early error here).
        template.statement`
        Object.keys(NAMESPACE).forEach(function(key) {
          if (key === "default" || key === "__esModule") return;
          VERIFY_NAME_LIST;
          if (key in EXPORTS && EXPORTS[key] === NAMESPACE[key]) return;

          Object.defineProperty(EXPORTS, key, {
            enumerable: true,
            get: function() {
              return NAMESPACE[key];
            },
          });
        });
    `
  )({
    NAMESPACE: namespace,
    EXPORTS: metadata.exportName,
    VERIFY_NAME_LIST: metadata.exportNameListName
      ? template`
            if (Object.prototype.hasOwnProperty.call(EXPORTS_LIST, key)) return;
          `({ EXPORTS_LIST: metadata.exportNameListName })
      : null,
  });
}

/**
 * Build a statement declaring a variable that contains all of the exported
 * variable names in an object so they can easily be referenced from an
 * export * from statement to check for conflicts.
 */
function buildExportNameListDeclaration(
  programPath: NodePath,
  metadata: ModuleMetadata,
) {
  const exportedVars = Object.create(null);
  for (const data of metadata.local.values()) {
    for (const name of data.names) {
      exportedVars[name] = true;
    }
  }

  let hasReexport = false;
  for (const data of metadata.source.values()) {
    for (const exportName of data.reexports.keys()) {
      exportedVars[exportName] = true;
    }
    for (const exportName of data.reexportNamespace) {
      exportedVars[exportName] = true;
    }

    hasReexport = hasReexport || !!data.reexportAll;
  }

  if (!hasReexport || Object.keys(exportedVars).length === 0) return null;

  const name = programPath.scope.generateUidIdentifier("exportNames");

  delete exportedVars.default;

  return {
    name: name.name,
    statement: variableDeclaration("var", [
      variableDeclarator(name, valueToNode(exportedVars)),
    ]),
  };
}

/**
 * Create a set of statements that will initialize all of the statically-known
 * export names with their expected values.
 */
function buildExportInitializationStatements(
  programPath: NodePath,
  metadata: ModuleMetadata,
  constantReexports: boolean | void = false,
  noIncompleteNsImportDetection: boolean | void = false,
) {
  const initStatements: Array<[string, t.Statement | null]> = [];

  for (const [localName, data] of metadata.local) {
    if (data.kind === "import") {
      // No-open since these are explicitly set with the "reexports" block.
    } else if (data.kind === "hoisted") {
      initStatements.push([
        // data.names is always of length 1 because a hoisted export
        // name must be id of a function declaration
        data.names[0],
        buildInitStatement(metadata, data.names, identifier(localName)),
      ]);
    } else if (!noIncompleteNsImportDetection) {
      for (const exportName of data.names) {
        initStatements.push([exportName, null]);
      }
    }
  }

  for (const data of metadata.source.values()) {
    if (!constantReexports) {
      const reexportsStatements = buildReexportsFromMeta(metadata, data, false);
      const reexports = [...data.reexports.keys()];
      for (let i = 0; i < reexportsStatements.length; i++) {
        initStatements.push([reexports[i], reexportsStatements[i]]);
      }
    }
    if (!noIncompleteNsImportDetection) {
      for (const exportName of data.reexportNamespace) {
        initStatements.push([exportName, null]);
      }
    }
  }

  // https://tc39.es/ecma262/#sec-module-namespace-exotic-objects
  // The [Exports] list is ordered as if an Array of those String values
  // had been sorted using %Array.prototype.sort% using undefined as comparefn
  initStatements.sort(([a], [b]) => {
    if (a < b) return -1;
    if (b < a) return 1;
    return 0;
  });

  const results = [];
  if (noIncompleteNsImportDetection) {
    for (const [, initStatement] of initStatements) {
      results.push(initStatement);
    }
  } else {
    // We generate init statements (`exports.a = exports.b = ... = void 0`)
    // for every 100 exported names to avoid deeply-nested AST structures.
    const chunkSize = 100;
    for (let i = 0; i < initStatements.length; i += chunkSize) {
      let uninitializedExportNames = [];
      for (let j = 0; j < chunkSize && i + j < initStatements.length; j++) {
        const [exportName, initStatement] = initStatements[i + j];
        if (initStatement !== null) {
          if (uninitializedExportNames.length > 0) {
            results.push(
              buildInitStatement(
                metadata,
                uninitializedExportNames,
                programPath.scope.buildUndefinedNode(),
              ),
            );
            // reset after uninitializedExportNames has been transformed
            // to init statements
            uninitializedExportNames = [];
          }
          results.push(initStatement);
        } else {
          uninitializedExportNames.push(exportName);
        }
      }
      if (uninitializedExportNames.length > 0) {
        results.push(
          buildInitStatement(
            metadata,
            uninitializedExportNames,
            programPath.scope.buildUndefinedNode(),
          ),
        );
      }
    }
  }

  return results;
}

/**
 * Given a set of export names, create a set of nested assignments to
 * initialize them all to a given expression.
 */
const InitTemplate = {
  computed: template.expression`EXPORTS["NAME"] = VALUE`,
  default: template.expression`EXPORTS.NAME = VALUE`,
};

function buildInitStatement(
  metadata: ModuleMetadata,
  exportNames: string[],
  initExpr: t.Expression,
) {
  const { stringSpecifiers, exportName: EXPORTS } = metadata;
  return expressionStatement(
    exportNames.reduce((acc, exportName) => {
      const params = {
        EXPORTS,
        NAME: exportName,
        VALUE: acc,
      };
      if (stringSpecifiers.has(exportName)) {
        return InitTemplate.computed(params);
      } else {
        return InitTemplate.default(params);
      }
    }, initExpr),
  );
}
