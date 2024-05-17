import type { File } from "@babel/core";
import traverse from "@babel/traverse";
import {
  assignmentExpression,
  cloneNode,
  expressionStatement,
  exportNamedDeclaration,
  exportSpecifier,
  file,
  identifier,
} from "@babel/types";
import type * as t from "@babel/types";
import helpers from "./helpers-generated.ts";
import type { HelperMetadata } from "./helpers-generated.ts";

let FileClass: typeof File | undefined = undefined;

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
  const {
    localBindingNames,
    dependencies,
    exportBindingAssignments,
    exportName,
  } = metadata;

  const dependenciesRefs: Record<string, t.Expression> = {};
  for (const name of Object.keys(dependencies)) {
    dependenciesRefs[name] =
      (typeof getDependency === "function" && getDependency(name)) ||
      identifier(name);
  }

  const toRename: Record<string, string> = {};
  const bindings = new Set(localBindings || []);
  if (id?.type === "Identifier") bindings.add(id.name);
  localBindingNames.forEach(name => {
    let newName = name;
    while (bindings.has(newName)) newName = "_" + newName;

    if (newName !== name) toRename[name] = newName;
  });

  if (id?.type === "Identifier" && exportName !== id.name) {
    toRename[exportName] = id.name;
  }

  for (const [name, paths] of Object.entries(dependencies)) {
    for (const path of paths) {
      deep(ast, path, cloneNode(dependenciesRefs[name]));
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

  return toRename;
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

    const fn = (ast: t.Program): File => {
      if (!process.env.BABEL_8_BREAKING) {
        if (!FileClass) {
          const fakeFile = { ast: file(ast), path: null } as File;
          traverse(fakeFile.ast, {
            Program: path => (fakeFile.path = path).stop(),
          });
          return fakeFile;
        }
      }
      return new FileClass(
        { filename: `babel-helper://${name}` },
        {
          ast: file(ast),
          code: "[internal Babel helper code]",
          inputMap: null,
        },
      );
    };

    helperData[name] = {
      minVersion: helper.minVersion,
      build(getDependency, id, localBindings) {
        const ast = helper.ast();
        const toRename = permuteHelperAST(
          ast,
          helper.metadata,
          id,
          localBindings,
          getDependency,
        );

        const file = fn(ast);
        Object.keys(toRename).forEach(name => {
          file.path.scope.rename(name, toRename[name]);
        });

        return {
          nodes: file.ast.program.body,
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

export function ensure(name: string, newFileClass: typeof File) {
  // We inject the File class here rather than importing it to avoid
  // circular dependencies between @babel/core and @babel/helpers.
  FileClass ||= newFileClass;

  loadHelper(name);
}

export const list = Object.keys(helpers).map(name => name.replace(/^_/, ""));

export default get;
