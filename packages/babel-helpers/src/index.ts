import { cloneNode, identifier } from "@babel/types";
import type * as t from "@babel/types";
import helpers from "./helpers-generated.ts";
import type { HelperMetadata } from "./helpers-generated.ts";

type GetDependency = (name: string) => t.Expression;

function deep(obj: any, path: string, value?: unknown) {
  try {
    const parts = path.split(".");
    let last = parts.shift();
    while (parts.length > 0) {
      obj = obj[last];
      last = parts.shift();
    }
    if (arguments.length > 2) {
      obj[last] = value;
    } else {
      return obj[last];
    }
  } catch (e) {
    e.message += ` (when accessing ${path})`;
    throw e;
  }
}

type AdjustAst = (
  ast: t.Program,
  exportName: string,
  mapExportBindingAssignments: (
    map: (node: t.Expression) => t.Expression,
  ) => void,
) => void;

/**
 * Given a helper AST and information about how it will be used, update the AST to match the usage.
 */
function permuteHelperAST(
  ast: t.Program,
  metadata: HelperMetadata,
  bindingName: string | undefined,
  localBindings: string[] | undefined,
  getDependency: GetDependency | undefined,
  adjustAst: AdjustAst | undefined,
) {
  const { locals, dependencies, exportBindingAssignments, exportName } =
    metadata;

  const bindings = new Set(localBindings || []);
  if (bindingName) bindings.add(bindingName);
  for (const [name, paths] of Object.entries(locals)) {
    let newName = name;
    if (bindingName && name === exportName) {
      newName = bindingName;
    } else {
      while (bindings.has(newName)) newName = "_" + newName;
    }

    if (newName !== name) {
      for (const path of paths) {
        deep(ast, path, identifier(newName));
      }
    }
  }

  for (const [name, paths] of Object.entries(dependencies)) {
    const ref =
      (typeof getDependency === "function" && getDependency(name)) ||
      identifier(name);
    for (const path of paths) {
      deep(ast, path, cloneNode(ref));
    }
  }

  adjustAst?.(ast, exportName, map => {
    exportBindingAssignments.forEach(p => deep(ast, p, map(deep(ast, p))));
  });
}

interface HelperData {
  build: (
    getDependency: GetDependency | undefined,
    bindingName: string | undefined,
    localBindings: string[] | undefined,
    adjustAst: AdjustAst | undefined,
  ) => {
    nodes: t.Program["body"];
    globals: string[];
  };
  minVersion: string;
  getDependencies: () => string[];
}

const helperData: Record<string, HelperData> = Object.create(null);
function loadHelper(name: string) {
  if (!helperData[name]) {
    const helper = helpers[name];
    if (!helper) {
      throw Object.assign(new ReferenceError(`Unknown helper ${name}`), {
        code: "BABEL_HELPER_UNKNOWN",
        helper: name,
      });
    }

    helperData[name] = {
      minVersion: helper.minVersion,
      build(getDependency, bindingName, localBindings, adjustAst) {
        const ast = helper.ast();
        permuteHelperAST(
          ast,
          helper.metadata,
          bindingName,
          localBindings,
          getDependency,
          adjustAst,
        );

        return {
          nodes: ast.body,
          globals: helper.metadata.globals,
        };
      },
      getDependencies() {
        return Object.keys(helper.metadata.dependencies);
      },
    };
  }

  return helperData[name];
}

export function get(
  name: string,
  getDependency?: GetDependency,
  bindingName?: string,
  localBindings?: string[],
  adjustAst?: AdjustAst,
) {
  if (!process.env.BABEL_8_BREAKING) {
    // In older versions, bindingName was a t.Identifier | t.MemberExpression
    if (typeof bindingName === "object") {
      const id = bindingName as t.Identifier | t.MemberExpression | null;
      if (id?.type === "Identifier") {
        bindingName = id.name;
      } else {
        bindingName = undefined;
      }
    }
  }
  return loadHelper(name).build(
    getDependency,
    bindingName,
    localBindings,
    adjustAst,
  );
}

export function minVersion(name: string) {
  return loadHelper(name).minVersion;
}

export function getDependencies(name: string): ReadonlyArray<string> {
  return loadHelper(name).getDependencies();
}

if (!process.env.BABEL_8_BREAKING && !USE_ESM) {
  // eslint-disable-next-line no-restricted-globals
  exports.ensure = (name: string) => {
    loadHelper(name);
  };
}

export const list = Object.keys(helpers).map(name => name.replace(/^_/, ""));

export default get;
