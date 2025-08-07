import type { NodePath, Visitor } from "@babel/traverse";
import type * as t from "@babel/types";

type HelperMetadata = {
  globals: string[];
  locals: Record<string, string[]>;
  dependencies: Record<string, string[]>;
  exportBindingAssignments: string[];
  exportName: string;
  internal: boolean;
};

/**
 * Given a file AST for a given helper, get a bunch of metadata about it so that Babel can quickly render
 * the helper is whatever context it is needed in.
 */
export function getHelperMetadata(
  babel: typeof import("@babel/core"),
  code: string,
  helperName: string,
  internal = false
) {
  const globals = new Set<string>();
  // Maps imported identifier name -> helper name
  const dependenciesBindings = new Map<string, string>();

  let exportName: string;
  const exportBindingAssignments: string[] = [];
  // helper name -> reference paths
  const dependencies = new Map<string, string[]>();
  // local variable name -> reference paths
  const locals = new Map();

  const spansToRemove: [number, number][] = [];

  function validateDefaultExport(
    decl: NodePath
  ): asserts decl is NodePath<t.FunctionDeclaration> {
    if (exportName) {
      throw new Error(
        `Helpers can have only one default export (in ${helperName})`
      );
    }

    if (!decl.isFunctionDeclaration() || !decl.node.id) {
      throw new Error(
        `Helpers can only export named function declarations (in ${helperName})`
      );
    }
  }

  const dependencyVisitor: Visitor = {
    Program(path) {
      for (const child of path.get("body")) {
        if (child.isImportDeclaration()) {
          if (
            child.get("specifiers").length !== 1 ||
            !child.get("specifiers.0").isImportDefaultSpecifier()
          ) {
            throw new Error(
              `Helpers can only import a default value (in ${helperName})`
            );
          }
          dependenciesBindings.set(
            child.node.specifiers[0].local.name,
            child.node.source.value
          );
          dependencies.set(child.node.source.value, []);
          spansToRemove.push([child.node.start, child.node.end]);
          child.remove();
        }
      }
      for (const child of path.get("body")) {
        if (child.isExportDefaultDeclaration()) {
          const decl = child.get("declaration");
          validateDefaultExport(decl);

          exportName = decl.node.id.name;
          spansToRemove.push([child.node.start, decl.node.start]);
          child.replaceWith(decl.node);
        } else if (
          child.isExportNamedDeclaration() &&
          child.node.specifiers.length === 1 &&
          child.get("specifiers.0.exported").isIdentifier({ name: "default" })
        ) {
          // @ts-expect-error checked above
          const { name } = child.node.specifiers[0].local;

          validateDefaultExport(child.scope.getBinding(name).path);

          exportName = name;
          spansToRemove.push([child.node.start, child.node.end]);
          child.remove();
        } else if (
          process.env.IS_BABEL_OLD_E2E &&
          child.isExportNamedDeclaration() &&
          child.node.specifiers.length === 0
        ) {
          spansToRemove.push([child.node.start, child.node.end]);
          child.remove();
        } else if (
          child.isExportAllDeclaration() ||
          child.isExportNamedDeclaration()
        ) {
          throw new Error(`Helpers can only export default (in ${helperName})`);
        }
      }

      path.scope.crawl();

      const bindings = path.scope.getAllBindings();
      Object.keys(bindings).forEach(name => {
        if (dependencies.has(name)) return;

        const binding = bindings[name];

        const references = [
          ...binding.path.getBindingIdentifierPaths(true)[name].map(makePath),
          ...binding.referencePaths.map(makePath),
        ];
        for (const violation of binding.constantViolations) {
          violation.getBindingIdentifierPaths(true)[name].forEach(path => {
            references.push(makePath(path));
          });
        }

        locals.set(name, references);
      });
    },
    ReferencedIdentifier(child) {
      const name = child.node.name;
      const binding = child.scope.getBinding(name);
      if (!binding) {
        if (dependenciesBindings.has(name)) {
          dependencies
            .get(dependenciesBindings.get(name))
            .push(makePath(child));
        } else if (name !== "arguments" || child.scope.path.isProgram()) {
          globals.add(name);
        }
      }
    },
    AssignmentExpression(child) {
      const left = child.get("left");

      if (!(exportName in left.getBindingIdentifiers())) return;

      if (!left.isIdentifier()) {
        throw new Error(
          `Only simple assignments to exports are allowed in helpers (in ${helperName})`
        );
      }

      const binding = child.scope.getBinding(exportName);

      if (binding?.scope.path.isProgram()) {
        exportBindingAssignments.push(makePath(child));
      }
    },
  };

  babel.transformSync(code, {
    configFile: false,
    babelrc: false,
    plugins: [() => ({ visitor: dependencyVisitor })],
  });

  if (!exportName) throw new Error("Helpers must have a named default export.");

  // Process these in reverse so that mutating the references does not invalidate any later paths in
  // the list.
  exportBindingAssignments.reverse();

  spansToRemove.sort(([start1], [start2]) => start2 - start1);
  for (const [start, end] of spansToRemove) {
    code = code.slice(0, start) + code.slice(end);
  }

  return [
    code,
    {
      globals: Array.from(globals),
      locals: Object.fromEntries(locals),
      dependencies: Object.fromEntries(dependencies),
      exportBindingAssignments,
      exportName,
      internal,
    },
  ] satisfies [string, HelperMetadata];
}

function makePath(path: NodePath) {
  const parts = [];

  for (; path.parentPath; path = path.parentPath) {
    parts.push(path.key);
    if (path.inList) parts.push(path.listKey);
  }

  return parts.reverse().join(".");
}

export function stringifyMetadata(metadata: HelperMetadata) {
  return `\
    {
      globals: ${JSON.stringify(metadata.globals)},
      locals: ${JSON.stringify(metadata.locals)},
      exportBindingAssignments: ${JSON.stringify(metadata.exportBindingAssignments)},
      exportName: ${JSON.stringify(metadata.exportName)},
      dependencies: ${JSON.stringify(metadata.dependencies)},
      internal: ${JSON.stringify(metadata.internal)},
    }
  `;
}
