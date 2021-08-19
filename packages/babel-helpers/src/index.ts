import type { File } from "@babel/core";
import type { NodePath, Visitor } from "@babel/traverse";
import traverse from "@babel/traverse";
import {
  assignmentExpression,
  cloneNode,
  expressionStatement,
  file as t_file,
  identifier,
  variableDeclaration,
  variableDeclarator,
} from "@babel/types";
import type * as t from "@babel/types";
import helpers from "./helpers";

function makePath(path: NodePath) {
  const parts = [];

  for (; path.parentPath; path = path.parentPath) {
    parts.push(path.key);
    if (path.inList) parts.push(path.listKey);
  }

  return parts.reverse().join(".");
}

let fileClass = undefined;

interface HelperMetadata {
  globals: string[];
  localBindingNames: string[];
  dependencies: Map<t.Identifier, string>;
  exportBindingAssignments: string[];
  exportPath: string;
  exportName: string;
  importBindingsReferences: string[];
  importPaths: string[];
}

/**
 * Given a file AST for a given helper, get a bunch of metadata about it so that Babel can quickly render
 * the helper is whatever context it is needed in.
 */
function getHelperMetadata(file: File): HelperMetadata {
  const globals = new Set<string>();
  const localBindingNames = new Set<string>();
  // Maps imported identifier -> helper name
  const dependencies = new Map<t.Identifier, string>();

  let exportName: string | undefined;
  let exportPath: string | undefined;
  const exportBindingAssignments: string[] = [];
  const importPaths: string[] = [];
  const importBindingsReferences: string[] = [];

  const dependencyVisitor: Visitor = {
    ImportDeclaration(child) {
      const name = child.node.source.value;
      if (!helpers[name]) {
        throw child.buildCodeFrameError(`Unknown helper ${name}`);
      }
      if (
        child.get("specifiers").length !== 1 ||
        !child.get("specifiers.0").isImportDefaultSpecifier()
      ) {
        throw child.buildCodeFrameError(
          "Helpers can only import a default value",
        );
      }
      const bindingIdentifier = child.node.specifiers[0].local;
      dependencies.set(bindingIdentifier, name);
      importPaths.push(makePath(child));
    },
    ExportDefaultDeclaration(child) {
      const decl = child.get("declaration");

      if (decl.isFunctionDeclaration()) {
        if (!decl.node.id) {
          throw decl.buildCodeFrameError(
            "Helpers should give names to their exported func declaration",
          );
        }

        exportName = decl.node.id.name;
      }
      exportPath = makePath(child);
    },
    ExportAllDeclaration(child) {
      throw child.buildCodeFrameError("Helpers can only export default");
    },
    ExportNamedDeclaration(child) {
      throw child.buildCodeFrameError("Helpers can only export default");
    },
    Statement(child) {
      if (child.isModuleDeclaration()) return;

      child.skip();
    },
  };

  const referenceVisitor: Visitor = {
    Program(path) {
      const bindings = path.scope.getAllBindings();

      Object.keys(bindings).forEach(name => {
        if (name === exportName) return;
        if (dependencies.has(bindings[name].identifier)) return;

        localBindingNames.add(name);
      });
    },
    ReferencedIdentifier(child) {
      const name = child.node.name;
      const binding = child.scope.getBinding(name);
      if (!binding) {
        globals.add(name);
      } else if (dependencies.has(binding.identifier)) {
        importBindingsReferences.push(makePath(child));
      }
    },
    AssignmentExpression(child) {
      const left = child.get("left");

      if (!(exportName in left.getBindingIdentifiers())) return;

      if (!left.isIdentifier()) {
        throw left.buildCodeFrameError(
          "Only simple assignments to exports are allowed in helpers",
        );
      }

      const binding = child.scope.getBinding(exportName);

      if (binding?.scope.path.isProgram()) {
        exportBindingAssignments.push(makePath(child));
      }
    },
  };

  traverse(file.ast, dependencyVisitor, file.scope);
  traverse(file.ast, referenceVisitor, file.scope);

  if (!exportPath) throw new Error("Helpers must default-export something.");

  // Process these in reverse so that mutating the references does not invalidate any later paths in
  // the list.
  exportBindingAssignments.reverse();

  return {
    globals: Array.from(globals),
    localBindingNames: Array.from(localBindingNames),
    dependencies,
    exportBindingAssignments,
    exportPath,
    exportName,
    importBindingsReferences,
    importPaths,
  };
}

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
  if (localBindings && !id) {
    throw new Error("Unexpected local bindings for module-based helpers.");
  }

  if (!id) return;

  const {
    localBindingNames,
    dependencies,
    exportBindingAssignments,
    exportPath,
    exportName,
    importBindingsReferences,
    importPaths,
  } = metadata;

  const dependenciesRefs: Record<string, t.Expression> = {};
  dependencies.forEach((name, id) => {
    dependenciesRefs[id.name] =
      (typeof getDependency === "function" && getDependency(name)) || id;
  });

  const toRename: Record<string, string> = {};
  const bindings = new Set(localBindings || []);
  localBindingNames.forEach(name => {
    let newName = name;
    while (bindings.has(newName)) newName = "_" + newName;

    if (newName !== name) toRename[name] = newName;
  });

  if (id.type === "Identifier" && exportName !== id.name) {
    toRename[exportName] = id.name;
  }

  const visitor: Visitor = {
    Program(path) {
      // We need to compute these in advance because removing nodes would
      // invalidate the paths.
      const exp: NodePath<t.ExportDefaultDeclaration> = path.get(exportPath);
      const imps: NodePath<t.ImportDeclaration>[] = importPaths.map(p =>
        path.get(p),
      );
      const impsBindingRefs: NodePath<t.Identifier>[] =
        importBindingsReferences.map(p => path.get(p));

      const decl = exp.get("declaration");
      if (id.type === "Identifier") {
        if (decl.isFunctionDeclaration()) {
          exp.replaceWith(decl);
        } else {
          exp.replaceWith(
            variableDeclaration("var", [
              variableDeclarator(id, decl.node as t.Expression),
            ]),
          );
        }
      } else if (id.type === "MemberExpression") {
        if (decl.isFunctionDeclaration()) {
          exportBindingAssignments.forEach(assignPath => {
            const assign: NodePath<t.Expression> = path.get(assignPath);
            assign.replaceWith(assignmentExpression("=", id, assign.node));
          });
          exp.replaceWith(decl);
          path.pushContainer(
            "body",
            expressionStatement(
              assignmentExpression("=", id, identifier(exportName)),
            ),
          );
        } else {
          exp.replaceWith(
            expressionStatement(
              assignmentExpression("=", id, decl.node as t.Expression),
            ),
          );
        }
      } else {
        throw new Error("Unexpected helper format.");
      }

      Object.keys(toRename).forEach(name => {
        path.scope.rename(name, toRename[name]);
      });

      for (const path of imps) path.remove();
      for (const path of impsBindingRefs) {
        const node = cloneNode(dependenciesRefs[path.node.name]);
        path.replaceWith(node);
      }

      // We only use "traverse" for all the handy scoping helpers, so we can stop immediately without
      // actually doing the traversal.
      path.stop();
    },
  };
  traverse(file.ast, visitor, file.scope);
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
  minVersion: () => string;
  dependencies: Map<t.Identifier, string>;
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
      const file = { ast: t_file(helper.ast()) };
      if (fileClass) {
        return new fileClass(
          {
            filename: `babel-helper://${name}`,
          },
          file,
        );
      }
      return file as File;
    };

    const metadata = getHelperMetadata(fn());

    helperData[name] = {
      build(getDependency, id, localBindings) {
        const file = fn();
        permuteHelperAST(file, metadata, id, localBindings, getDependency);

        return {
          nodes: file.ast.program.body,
          globals: metadata.globals,
        };
      },
      minVersion() {
        return helper.minVersion;
      },
      dependencies: metadata.dependencies,
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
  return loadHelper(name).minVersion();
}

export function getDependencies(name: string): ReadonlyArray<string> {
  return Array.from(loadHelper(name).dependencies.values());
}

export function ensure(name: string, newFileClass?) {
  if (!fileClass) {
    // optional fileClass used to wrap helper snippets into File instance,
    // offering `path.hub` support during traversal
    fileClass = newFileClass;
  }
  loadHelper(name);
}

export const list = Object.keys(helpers)
  .map(name => name.replace(/^_/, ""))
  .filter(name => name !== "__esModule");

export default get;
