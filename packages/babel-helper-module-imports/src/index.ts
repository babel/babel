import ImportInjector, { type ImportOptions } from "./import-injector.ts";
import type { NodePath } from "@babel/traverse";
import type * as t from "@babel/types";

export { ImportInjector };

export { default as isModule } from "./is-module.ts";

export function addDefault(
  path: NodePath,
  importedSource: string,
  opts?: Partial<ImportOptions>,
) {
  return new ImportInjector(path).addDefault(importedSource, opts);
}

function addNamed(
  path: NodePath,
  name: string,
  importedSource: string,
  opts?: Omit<
    Partial<ImportOptions>,
    "ensureLiveReference" | "ensureNoContext"
  >,
): t.Identifier;
function addNamed(
  path: NodePath,
  name: string,
  importedSource: string,
  opts?: Omit<Partial<ImportOptions>, "ensureLiveReference"> & {
    ensureLiveReference: true;
  },
): t.MemberExpression;
function addNamed(
  path: NodePath,
  name: string,
  importedSource: string,
  opts?: Omit<Partial<ImportOptions>, "ensureNoContext"> & {
    ensureNoContext: true;
  },
): t.SequenceExpression;
/**
 * add a named import to the program path of given path
 *
 * @export
 * @param {NodePath} path The starting path to find a program path
 * @param {string} name The name of the generated binding. Babel will prefix it with `_`
 * @param {string} importedSource The source of the import
 * @param {Partial<ImportOptions>} [opts]
 * @returns {t.Identifier | t.MemberExpression | t.SequenceExpression} If opts.ensureNoContext is true, returns a SequenceExpression,
 *   else if opts.ensureLiveReference is true, returns a MemberExpression, else returns an Identifier
 */
function addNamed(
  path: NodePath,
  name: string,
  importedSource: string,
  opts?: Partial<ImportOptions>,
) {
  return new ImportInjector(path).addNamed(name, importedSource, opts);
}
export { addNamed };

export function addNamespace(
  path: NodePath,
  importedSource: string,
  opts?: Partial<ImportOptions>,
) {
  return new ImportInjector(path).addNamespace(importedSource, opts);
}

export function addSideEffect(
  path: NodePath,
  importedSource: string,
  opts?: Partial<ImportOptions>,
) {
  return new ImportInjector(path).addSideEffect(importedSource, opts);
}
