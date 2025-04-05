import assert from "node:assert";
import {
  identifier,
  importSpecifier,
  numericLiteral,
  sequenceExpression,
  isImportDeclaration,
} from "@babel/types";
import type * as t from "@babel/types";
import type { NodePath, Scope, HubInterface } from "@babel/traverse";

import ImportBuilder from "./import-builder.ts";
import isModule from "./is-module.ts";

export type ImportOptions = {
  /**
   * The module being referenced.
   */
  importedSource: string | null;
  /**
   * The type of module being imported:
   *
   *  * 'es6'      - An ES6 module.
   *  * 'commonjs' - A CommonJS module. (Default)
   */
  importedType: "es6" | "commonjs";
  /**
   * The type of interop behavior for namespace/default/named when loading
   * CommonJS modules.
   *
   * ## 'babel' (Default)
   *
   * Load using Babel's interop.
   *
   * If '.__esModule' is true, treat as 'compiled', else:
   *
   * * Namespace: A copy of the module.exports with .default
   *     populated by the module.exports object.
   * * Default: The module.exports value.
   * * Named: The .named property of module.exports.
   *
   * The 'ensureLiveReference' has no effect on the liveness of these.
   *
   * ## 'compiled'
   *
   * Assume the module is ES6 compiled to CommonJS. Useful to avoid injecting
   * interop logic if you are confident that the module is a certain format.
   *
   * * Namespace: The root module.exports object.
   * * Default: The .default property of the namespace.
   * * Named: The .named property of the namespace.
   *
   * Will return erroneous results if the imported module is _not_ compiled
   * from ES6 with Babel.
   *
   * ## 'uncompiled'
   *
   * Assume the module is _not_ ES6 compiled to CommonJS. Used a simplified
   * access pattern that doesn't require additional function calls.
   *
   * Will return erroneous results if the imported module _is_ compiled
   * from ES6 with Babel.
   *
   * * Namespace: The module.exports object.
   * * Default: The module.exports object.
   * * Named: The .named property of module.exports.
   */
  importedInterop: "babel" | "node" | "compiled" | "uncompiled";
  /**
   * The type of CommonJS interop included in the environment that will be
   * loading the output code.
   *
   *  * 'babel' - CommonJS modules load with Babel's interop. (Default)
   *  * 'node'  - CommonJS modules load with Node's interop.
   *
   * See descriptions in 'importedInterop' for more details.
   */
  importingInterop: "babel" | "node";
  /**
   * Define whether we explicitly care that the import be a live reference.
   * Only applies when importing default and named imports, not the namespace.
   *
   *  * true  - Force imported values to be live references.
   *  * false - No particular requirements. Keeps the code simplest. (Default)
   */
  ensureLiveReference: boolean;
  /**
   * Define if we explicitly care that the result not be a property reference.
   *
   *  * true  - Force calls to exclude context. Useful if the value is going to
   *            be used as function callee.
   *  * false - No particular requirements for context of the access. (Default)
   */
  ensureNoContext: boolean;
  /**
   * Define whether the import should be loaded before or after the existing imports.
   * "after" is only allowed inside ECMAScript modules, since it's not possible to
   * reliably pick the location _after_ require() calls but _before_ other code in CJS.
   */
  importPosition: "before" | "after";

  nameHint?: string;
  blockHoist?: number;
};

/**
 * A general helper classes add imports via transforms. See README for usage.
 */
export default class ImportInjector {
  /**
   * The path used for manipulation.
   */
  declare _programPath: NodePath<t.Program>;

  /**
   * The scope used to generate unique variable names.
   */
  declare _programScope: Scope;

  /**
   * The file used to inject helpers and resolve paths.
   */
  declare _hub: HubInterface;

  /**
   * The default options to use with this instance when imports are added.
   */
  _defaultOpts: ImportOptions = {
    importedSource: null,
    importedType: "commonjs",
    importedInterop: "babel",
    importingInterop: "babel",
    ensureLiveReference: false,
    ensureNoContext: false,
    importPosition: "before",
  };

  constructor(
    path: NodePath,
    importedSource?: string,
    opts?: Partial<ImportOptions>,
  ) {
    const programPath = path.find(p => p.isProgram()) as NodePath<t.Program>;

    this._programPath = programPath;
    this._programScope = programPath.scope;
    this._hub = programPath.hub;

    this._defaultOpts = this._applyDefaults(importedSource, opts, true);
  }

  addDefault(importedSourceIn: string, opts: Partial<ImportOptions>) {
    return this.addNamed("default", importedSourceIn, opts);
  }

  addNamed(
    importName: string,
    importedSourceIn: string,
    opts: Partial<ImportOptions>,
  ) {
    assert(typeof importName === "string");

    return this._generateImport(
      this._applyDefaults(importedSourceIn, opts),
      importName,
    );
  }

  addNamespace(importedSourceIn: string, opts: Partial<ImportOptions>) {
    return this._generateImport(
      this._applyDefaults(importedSourceIn, opts),
      null,
    );
  }

  addSideEffect(importedSourceIn: string, opts: Partial<ImportOptions>) {
    return this._generateImport(
      this._applyDefaults(importedSourceIn, opts),
      void 0,
    );
  }

  _applyDefaults(
    importedSource: string | Partial<ImportOptions>,
    opts: Partial<ImportOptions> | undefined,
    isInit = false,
  ) {
    let newOpts: ImportOptions;
    if (typeof importedSource === "string") {
      newOpts = { ...this._defaultOpts, importedSource, ...opts };
    } else {
      assert(!opts, "Unexpected secondary arguments.");
      newOpts = { ...this._defaultOpts, ...importedSource };
    }

    if (!isInit && opts) {
      if (opts.nameHint !== undefined) newOpts.nameHint = opts.nameHint;
      if (opts.blockHoist !== undefined) newOpts.blockHoist = opts.blockHoist;
    }
    return newOpts;
  }

  _generateImport(
    opts: Partial<ImportOptions>,
    importName: string | null | undefined,
  ) {
    const isDefault = importName === "default";
    const isNamed = !!importName && !isDefault;
    const isNamespace = importName === null;

    const {
      importedSource,
      importedType,
      importedInterop,
      importingInterop,
      ensureLiveReference,
      ensureNoContext,
      nameHint,
      importPosition,

      // Not meant for public usage. Allows code that absolutely must control
      // ordering to set a specific hoist value on the import nodes.
      // This is ignored when "importPosition" is "after".
      blockHoist,
    } = opts;

    // Provide a hint for generateUidIdentifier for the local variable name
    // to use for the import, if the code will generate a simple assignment
    // to a variable.
    let name = nameHint || importName;

    const isMod = isModule(this._programPath);
    const isModuleForNode = isMod && importingInterop === "node";
    const isModuleForBabel = isMod && importingInterop === "babel";

    if (importPosition === "after" && !isMod) {
      throw new Error(`"importPosition": "after" is only supported in modules`);
    }

    const builder = new ImportBuilder(
      importedSource,
      this._programScope,
      this._hub,
    );

    if (importedType === "es6") {
      if (!isModuleForNode && !isModuleForBabel) {
        throw new Error("Cannot import an ES6 module from CommonJS");
      }

      // import * as namespace from ''; namespace
      // import def from ''; def
      // import { named } from ''; named
      builder.import();
      if (isNamespace) {
        builder.namespace(nameHint || importedSource);
      } else if (isDefault || isNamed) {
        builder.named(name, importName);
      }
    } else if (importedType !== "commonjs") {
      throw new Error(`Unexpected interopType "${importedType}"`);
    } else if (importedInterop === "babel") {
      if (isModuleForNode) {
        // import _tmp from ''; var namespace = interopRequireWildcard(_tmp); namespace
        // import _tmp from ''; var def = interopRequireDefault(_tmp).default; def
        // import _tmp from ''; _tmp.named
        name = name !== "default" ? name : importedSource;
        const es6Default = `${importedSource}$es6Default`;

        builder.import();
        if (isNamespace) {
          builder
            .default(es6Default)
            .var(name || importedSource)
            .wildcardInterop();
        } else if (isDefault) {
          if (ensureLiveReference) {
            builder
              .default(es6Default)
              .var(name || importedSource)
              .defaultInterop()
              .read("default");
          } else {
            builder
              .default(es6Default)
              .var(name)
              .defaultInterop()
              .prop(importName);
          }
        } else if (isNamed) {
          builder.default(es6Default).read(importName);
        }
      } else if (isModuleForBabel) {
        // import * as namespace from ''; namespace
        // import def from ''; def
        // import { named } from ''; named
        builder.import();
        if (isNamespace) {
          builder.namespace(name || importedSource);
        } else if (isDefault || isNamed) {
          builder.named(name, importName);
        }
      } else {
        // var namespace = interopRequireWildcard(require(''));
        // var def = interopRequireDefault(require('')).default; def
        // var named = require('').named; named
        builder.require();
        if (isNamespace) {
          builder.var(name || importedSource).wildcardInterop();
        } else if ((isDefault || isNamed) && ensureLiveReference) {
          if (isDefault) {
            name = name !== "default" ? name : importedSource;
            builder.var(name).read(importName);
            builder.defaultInterop();
          } else {
            builder.var(importedSource).read(importName);
          }
        } else if (isDefault) {
          builder.var(name).defaultInterop().prop(importName);
        } else if (isNamed) {
          builder.var(name).prop(importName);
        }
      }
    } else if (importedInterop === "compiled") {
      if (isModuleForNode) {
        // import namespace from ''; namespace
        // import namespace from ''; namespace.default
        // import namespace from ''; namespace.named

        builder.import();
        if (isNamespace) {
          builder.default(name || importedSource);
        } else if (isDefault || isNamed) {
          builder.default(importedSource).read(name);
        }
      } else if (isModuleForBabel) {
        // import * as namespace from ''; namespace
        // import def from ''; def
        // import { named } from ''; named
        // Note: These lookups will break if the module has no __esModule set,
        // hence the warning that 'compiled' will not work on standard CommonJS.

        builder.import();
        if (isNamespace) {
          builder.namespace(name || importedSource);
        } else if (isDefault || isNamed) {
          builder.named(name, importName);
        }
      } else {
        // var namespace = require(''); namespace
        // var namespace = require(''); namespace.default
        // var namespace = require(''); namespace.named
        // var named = require('').named;
        builder.require();
        if (isNamespace) {
          builder.var(name || importedSource);
        } else if (isDefault || isNamed) {
          if (ensureLiveReference) {
            builder.var(importedSource).read(name);
          } else {
            builder.prop(importName).var(name);
          }
        }
      }
    } else if (importedInterop === "uncompiled") {
      if (isDefault && ensureLiveReference) {
        throw new Error("No live reference for commonjs default");
      }

      if (isModuleForNode) {
        // import namespace from ''; namespace
        // import def from ''; def;
        // import namespace from ''; namespace.named
        builder.import();
        if (isNamespace) {
          builder.default(name || importedSource);
        } else if (isDefault) {
          builder.default(name);
        } else if (isNamed) {
          builder.default(importedSource).read(name);
        }
      } else if (isModuleForBabel) {
        // import namespace from '';
        // import def from '';
        // import { named } from ''; named;
        // Note: These lookups will break if the module has __esModule set,
        // hence the warning that 'uncompiled' will not work on ES6 transpiled
        // to CommonJS.

        builder.import();
        if (isNamespace) {
          builder.default(name || importedSource);
        } else if (isDefault) {
          builder.default(name);
        } else if (isNamed) {
          builder.named(name, importName);
        }
      } else {
        // var namespace = require(''); namespace
        // var def = require(''); def
        // var namespace = require(''); namespace.named
        // var named = require('').named;
        builder.require();
        if (isNamespace) {
          builder.var(name || importedSource);
        } else if (isDefault) {
          builder.var(name);
        } else if (isNamed) {
          if (ensureLiveReference) {
            builder.var(importedSource).read(name);
          } else {
            builder.var(name).prop(importName);
          }
        }
      }
    } else {
      throw new Error(`Unknown importedInterop "${importedInterop}".`);
    }

    const { statements, resultName } = builder.done();

    this._insertStatements(statements, importPosition, blockHoist);

    if (
      (isDefault || isNamed) &&
      ensureNoContext &&
      resultName.type !== "Identifier"
    ) {
      return sequenceExpression([numericLiteral(0), resultName]);
    }
    return resultName;
  }

  _insertStatements(
    statements: t.Statement[],
    importPosition = "before",
    blockHoist = 3,
  ) {
    if (importPosition === "after") {
      if (this._insertStatementsAfter(statements)) return;
    } else {
      if (this._insertStatementsBefore(statements, blockHoist)) return;
    }

    this._programPath.unshiftContainer("body", statements);
  }

  _insertStatementsBefore(statements: t.Statement[], blockHoist: number) {
    if (
      statements.length === 1 &&
      isImportDeclaration(statements[0]) &&
      isValueImport(statements[0])
    ) {
      const firstImportDecl = this._programPath
        .get("body")
        .find((p): p is NodePath<t.ImportDeclaration> => {
          return p.isImportDeclaration() && isValueImport(p.node);
        });

      if (
        firstImportDecl?.node.source.value === statements[0].source.value &&
        maybeAppendImportSpecifiers(firstImportDecl.node, statements[0])
      ) {
        return true;
      }
    }

    statements.forEach(node => {
      // @ts-expect-error handle _blockHoist
      node._blockHoist = blockHoist;
    });

    const targetPath = this._programPath.get("body").find(p => {
      // @ts-expect-error todo(flow->ts): avoid mutations
      const val = p.node._blockHoist;
      return Number.isFinite(val) && val < 4;
    });

    if (targetPath) {
      targetPath.insertBefore(statements);
      return true;
    }

    return false;
  }

  _insertStatementsAfter(statements: t.Statement[]): boolean {
    const statementsSet = new Set(statements);
    const importDeclarations: Map<string, t.ImportDeclaration[]> = new Map();

    for (const statement of statements) {
      if (isImportDeclaration(statement) && isValueImport(statement)) {
        const source = statement.source.value;
        if (!importDeclarations.has(source)) importDeclarations.set(source, []);
        importDeclarations.get(source).push(statement);
      }
    }

    let lastImportPath = null;
    for (const bodyStmt of this._programPath.get("body")) {
      if (bodyStmt.isImportDeclaration() && isValueImport(bodyStmt.node)) {
        lastImportPath = bodyStmt;

        const source = bodyStmt.node.source.value;
        const newImports = importDeclarations.get(source);
        if (!newImports) continue;

        for (const decl of newImports) {
          if (!statementsSet.has(decl)) continue;
          if (maybeAppendImportSpecifiers(bodyStmt.node, decl)) {
            statementsSet.delete(decl);
          }
        }
      }
    }

    if (statementsSet.size === 0) return true;

    if (lastImportPath) lastImportPath.insertAfter(Array.from(statementsSet));

    return !!lastImportPath;
  }
}

function isValueImport(node: t.ImportDeclaration) {
  return node.importKind !== "type" && node.importKind !== "typeof";
}

function hasNamespaceImport(node: t.ImportDeclaration) {
  return (
    (node.specifiers.length === 1 &&
      node.specifiers[0].type === "ImportNamespaceSpecifier") ||
    (node.specifiers.length === 2 &&
      node.specifiers[1].type === "ImportNamespaceSpecifier")
  );
}

function hasDefaultImport(node: t.ImportDeclaration) {
  return (
    node.specifiers.length > 0 &&
    node.specifiers[0].type === "ImportDefaultSpecifier"
  );
}

function maybeAppendImportSpecifiers(
  target: t.ImportDeclaration,
  source: t.ImportDeclaration,
): boolean {
  if (!target.specifiers.length) {
    target.specifiers = source.specifiers;
    return true;
  }
  if (!source.specifiers.length) return true;

  if (hasNamespaceImport(target) || hasNamespaceImport(source)) return false;

  if (hasDefaultImport(source)) {
    if (hasDefaultImport(target)) {
      source.specifiers[0] = importSpecifier(
        source.specifiers[0].local,
        identifier("default"),
      );
    } else {
      target.specifiers.unshift(source.specifiers.shift());
    }
  }

  target.specifiers.push(...source.specifiers);

  return true;
}
