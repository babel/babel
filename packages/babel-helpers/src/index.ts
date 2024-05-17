import {
  assignmentExpression,
  cloneNode,
  expressionStatement,
  exportNamedDeclaration,
  exportSpecifier,
  identifier,
} from "@babel/types";
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

/**
 * Given a helper AST and information about how it will be used, update the AST to match the usage.
 */
function permuteHelperAST(
  ast: t.Program,
  metadata: HelperMetadata,
  id?: t.Identifier | t.MemberExpression,
  localBindings?: string[],
  getDependency?: GetDependency,
) {
  const { locals, dependencies, exportBindingAssignments, exportName } =
    metadata;

  const bindings = new Set(localBindings || []);
  if (id?.type === "Identifier") bindings.add(id.name);
  for (const [name, paths] of Object.entries(locals)) {
    let newName = name;
    if (name === exportName && id?.type === "Identifier") {
      newName = id.name;
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

  if (!id) {
    ast.body.push(
      exportNamedDeclaration(null, [
        exportSpecifier(identifier(exportName), identifier("default")),
      ]),
    );
  } else if (id.type === "MemberExpression") {
    exportBindingAssignments.forEach(assignPath => {
      deep(
        ast,
        assignPath,
        assignmentExpression("=", id, deep(ast, assignPath)),
      );
    });
    ast.body.push(
      expressionStatement(
        assignmentExpression("=", id, identifier(exportName)),
      ),
    );
  } else if (id.type !== "Identifier") {
    throw new Error("Unexpected helper format.");
  }
}

interface HelperData {
  build: (
    getDependency: GetDependency,
    id: t.Identifier | t.MemberExpression,
    localBindings: string[],
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
      build(getDependency, id, localBindings) {
        const ast = helper.ast();
        permuteHelperAST(
          ast,
          helper.metadata,
          id,
          localBindings,
          getDependency,
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
  id?: t.Identifier | t.MemberExpression,
  localBindings?: string[],
) {
  return loadHelper(name).build(getDependency, id, localBindings);
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
