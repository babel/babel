import type { File } from "@babel/core";
import type { NodePath } from "@babel/traverse";
import traverse from "@babel/traverse";
import {
  assignmentExpression,
  cloneNode,
  expressionStatement,
  file,
  identifier,
} from "@babel/types";
import type * as t from "@babel/types";
import helpers from "./helpers-generated.ts";
import type { HelperMetadata } from "./helpers-generated.ts";

let FileClass: typeof File | undefined = undefined;

type GetDependency = (name: string) => t.Expression;

/**
 * Given a helper AST and information about how it will be used, update the AST to match the usage.
 */
function permuteHelperAST(
  file: File,
  metadata: HelperMetadata,
  id?: t.Identifier | t.MemberExpression,
  localBindings?: string[],
  getDependency?: GetDependency,
) {
  const {
    localBindingNames,
    dependencies,
    exportBindingAssignments,
    exportPath,
    exportName,
    importBindingsReferences,
  } = metadata;

  const dependenciesRefs: Record<string, t.Expression> = {};
  dependencies.forEach((name, id) => {
    dependenciesRefs[id] =
      (typeof getDependency === "function" && getDependency(name)) ||
      identifier(id);
  });

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

  const { path } = file;

  // We need to compute these in advance because removing nodes would
  // invalidate the paths.
  const exp: NodePath<t.ExportDefaultDeclaration> = path.get(exportPath);
  const impsBindingRefs: NodePath<t.Identifier>[] =
    importBindingsReferences.map(p => path.get(p));

  // We assert that this is a FunctionDeclaration in dependencyVisitor.
  const decl = exp.get("declaration") as NodePath<t.FunctionDeclaration>;

  if (id?.type === "Identifier") {
    exp.replaceWith(decl);
  } else if (id?.type === "MemberExpression") {
    exportBindingAssignments.forEach(assignPath => {
      const assign = path.get(assignPath) as NodePath<t.Expression>;
      assign.replaceWith(assignmentExpression("=", id, assign.node));
    });
    exp.replaceWith(decl);
    path.pushContainer(
      "body",
      expressionStatement(
        assignmentExpression("=", id, identifier(exportName)),
      ),
    );
  } else if (id) {
    throw new Error("Unexpected helper format.");
  }

  Object.keys(toRename).forEach(name => {
    path.scope.rename(name, toRename[name]);
  });

  for (const path of impsBindingRefs) {
    const node = cloneNode(dependenciesRefs[path.node.name]);
    path.replaceWith(node);
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

    const fn = (): File => {
      if (!process.env.BABEL_8_BREAKING) {
        if (!FileClass) {
          const fakeFile = { ast: file(helper.ast()), path: null } as File;
          traverse(fakeFile.ast, {
            Program: path => (fakeFile.path = path).stop(),
          });
          return fakeFile;
        }
      }
      return new FileClass(
        { filename: `babel-helper://${name}` },
        {
          ast: file(helper.ast()),
          code: "[internal Babel helper code]",
          inputMap: null,
        },
      );
    };

    helperData[name] = {
      minVersion: helper.minVersion,
      build(getDependency, id, localBindings) {
        const file = fn();
        permuteHelperAST(
          file,
          helper.metadata,
          id,
          localBindings,
          getDependency,
        );

        return {
          nodes: file.ast.program.body,
          globals: helper.metadata.globals,
        };
      },
      getDependencies() {
        return Array.from(helper.metadata.dependencies.values());
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
