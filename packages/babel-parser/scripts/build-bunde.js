"use strict";

const fs = require("fs").promises;
const fsPath = require("path");
const rollup = require("rollup");
const rollupPluginBabel = require("rollup-plugin-babel");
const babel = require("@babel/core");
const splitExport = require("@babel/helper-split-export-declaration").default;
const { types: t } = babel;

// prettier-ignore
const [/* node */, /* file */, input, output] = process.argv;

if (process.main) main(input).then(code => fs.writeFile(output, code));
else module.exports = main;

async function main(input) {
  const inputPath = fsPath.resolve(input);

  const { ast, source } = await read(inputPath);

  const deps = getDependencies(ast);
  await loadDependencies(deps, fsPath.dirname(inputPath));

  const result = await babel.transformFromAstAsync(ast, source, {
    configFile: false,
    filename: inputPath,
    plugins: [[inlineSubmodulesPlugin, { deps }]],
  });

  return result.code;
}

async function read(path) {
  const source = await fs.readFile(path, "utf8");
  return {
    source,
    ast: await babel.parseAsync(source, { filename: path }),
  };
}

function getDependencies(ast) {
  const deps = new Map();
  t.traverseFast(ast, node => {
    if (!t.isCallExpression(node)) return;
    if (!t.isIdentifier(node.callee, { name: "load" })) return;
    deps.set(node.arguments[0].value, null);
  });
  return deps;
}

async function loadDependencies(deps, basePath) {
  const promises = [];

  for (const name of deps.keys()) {
    const path = fsPath.join(basePath, name);
    promises.push(loadDependency(path, name, deps));
  }

  await Promise.all(promises);
}

async function loadDependency(path, name, deps) {
  const bundle = await rollup.rollup({
    input: path,
    external(id) {
      return !id.startsWith("./") && !id.startsWith("/");
    },
    plugins: [
      rollupPluginBabel({
        configFile: false,
        presets: [require("@babel/preset-flow")],
      }),
    ],
    // Some functions may look pure, but they might be
    // overwritten by parser plugins.
    // e.g. parseAssignableListItemTypes
    treeshake: false,
  });

  const { output } = await bundle.generate({ format: "esm" });

  for (const { code } of output) {
    deps.set(name, await transformDependency(code, path));
  }
}

async function transformDependency(code, filename) {
  const ast = await babel.parseAsync(code, { filename });
  const exports = new Map();
  const imports = new Map();
  const globals = new Map();
  const references = new Map();
  const result = await babel.transformFromAstAsync(ast, null, {
    configFile: false,
    ast: true,
    code: false,
    filename,
    plugins: [
      [transformDependencyPlugin, { exports, references, globals, imports }],
    ],
  });

  return {
    ast: result.ast.program.body,
    globals,
    exports,
    imports,
    references,
    exportRenames: new Map(),
  };
}

function transformDependencyPlugin(
  babel,
  { exports, references, globals, imports }
) {
  function registerExportedFunction(path, local, exported) {
    const { node } = path;
    const { id } = node;

    exports.set(exported, { node, id });
  }

  function registerExportedVar(path, local, exported) {
    const { node } = path;
    const ids = t.getBindingIdentifiers(node);

    for (const name of Object.keys(ids)) {
      const decl = path.scope.getBinding(name);
      exports.set(exported, { id: ids[name], node: decl.path.node });
    }
  }

  function registerExported(path, local, exported) {
    if (path.isVariableDeclarator()) {
      registerExportedVar(path, local, exported);
    } else {
      registerExportedFunction(path, local, exported);
    }
  }

  function getRefs(path, name) {
    const binding = path.scope.getBinding(name);
    const refs = new Set();
    for (const { node } of binding.referencePaths) refs.add(node);
    return refs;
  }

  const originals = new Map();
  let originalsPath = null;

  return {
    visitor: {
      Program: {
        exit(path) {
          for (const name of Object.keys(path.scope.bindings)) {
            globals.set(name, getRefs(path, name));
          }
        },
      },
      ExportDefaultDeclaration(path) {
        path.parentPath.pushContainer(
          "body",
          t.returnStatement(path.node.declaration)
        );
        path.remove();
      },
      ExportNamedDeclaration: {
        enter(path) {
          const { node } = path;
          if (!node.declaration) return;
          splitExport(path);
        },
        exit(path) {
          path.remove();
        },
      },
      ExportSpecifier(path) {
        const { node } = path;
        const binding = path.scope.getBinding(node.local.name).path;
        registerExported(binding, node.local.name, node.exported.name);
      },
      ImportDeclaration: pluginHelperHandleImport(
        {
          original(path) {
            const { name } = path.node.arguments[0];

            if (!originalsPath) {
              // We can't use scope.push because
              // _blockHoist breaks when the modules are merged.
              originalsPath = path.scope
                .getProgramParent()
                .path.unshiftContainer(
                  "body",
                  t.variableDeclaration("let", [])
                )[0];
            }

            let id;
            if (originals.has(name)) {
              id = originals.get(name);
            } else {
              id = path.scope.generateUid(`original_${name}`);
              originals.set(name, id);
              const newPath = originalsPath.pushContainer(
                "declarations",
                t.variableDeclarator(t.identifier(id), t.identifier(name))
              )[0];
              newPath.scope.registerDeclaration(newPath);
            }

            path.replaceWith(t.identifier(id));
          },
          bindings(path) {
            for (const { node } of path.get("specifiers")) {
              const { name } = node.local;
              references.set(node.imported.name, getRefs(path, name));
            }
          },
        },
        (path, state) => {
          const source = path.node.source.value;
          const absolute =
            source.startsWith(".") || source.startsWith("/")
              ? fsPath.resolve(fsPath.dirname(state.file.opts.filename), source)
              : source;

          const ns = path
            .get("specifiers")
            .find(t => t.isImportNamespaceSpecifier());

          let id;
          if (ns) id = ns.node.local;
          else id = path.scope.generateUidIdentifier(source);

          const refs = new Set();

          for (const specifier of path.get("specifiers")) {
            let local, imported;
            if (specifier.isImportDefaultSpecifier()) {
              local = specifier.node.local.name;
              imported = "default";
            } else if (specifier.isImportNamespaceSpecifier()) {
              for (const ref of getRefs(path, id.name)) {
                refs.add(ref);
              }
            } else {
              local = specifier.node.local.name;
              imported = specifier.node.imported.name;
            }

            const binding = path.scope.getBinding(local);
            for (const path of binding.referencePaths) {
              const node = t.cloneNode(id);
              refs.add(node);
              path.replaceWith(
                t.memberExpression(node, t.identifier(imported))
              );
            }
          }

          imports.set(absolute, refs);

          path.remove();
        }
      ),
    },
  };
}

function inlineSubmodulesPlugin({ types: t, template }, { deps }) {
  const sharedBindings = new Map();
  const reservedBindings = new Set();

  return {
    visitor: {
      ImportDeclaration: pluginHelperHandleImport({
        load(path) {
          const name = path.node.arguments[0].value;
          const dep = deps.get(name);

          path.replaceWith(template.expression.ast`function () { ${dep.ast} }`);

          const { scope } = path;
          scope.crawl();

          for (const [name] of dep.globals) {
            const exp = dep.exports.has(name);
            const saw = sharedBindings.has(name);
            const has = scope.parent.hasBinding(name);
            if (!saw && !has) {
              if (exp) sharedBindings.set(name, name);
            } else if (exp && saw) {
              const newName = sharedBindings.get(name);
              scope.rename(name, sharedBindings.get(name));
              if (reservedBindings.has(name)) {
                reservedBindings.delete(name);
                continue;
              }
              const binding = path.scope.getBinding(newName).path;
              if (binding.isFunctionDeclaration()) {
                binding.node.id = null;
                binding.replaceWith(template.statement.ast`
                  ${t.identifier(newName)} = ${t.toExpression(binding.node)};
                `);
              }
            } else {
              const newName = scope.generateUid(name);
              scope.rename(name, newName);
              if (exp) sharedBindings.set(name, newName);
            }
          }

          for (const [name, refs] of dep.references) {
            let newName = sharedBindings.get(name);
            if (!newName) {
              newName = scope.parent.hasBinding(name)
                ? scope.generateUid(name)
                : name;
              sharedBindings.set(name, newName);
              reservedBindings.add(name);
            }
            if (newName !== name) {
              for (const ref of refs) ref.name = newName;
            }
          }

          const stmt = path.getStatementParent();
          const body = path.get("body.body");

          let res;
          const last = body[body.length - 1];
          if (last && last.isReturnStatement()) {
            res = t.cloneNode(last.node.argument);
            last.remove();
          }
          if (!res) {
            res = path.scope.buildUndefinedNode();
          }

          stmt.insertBefore(path.node.body.body);
          path.replaceWith(res);
        },
      }),
      Program(path, state) {
        const allImports = new Map();
        for (const dep of deps.values()) {
          for (const [absolute, refs] of dep.imports) {
            if (!allImports.has(absolute)) allImports.set(absolute, new Set());
            const set = allImports.get(absolute);
            for (const ref of refs) set.add(ref);
          }
        }
        const newNodes = [];
        for (const [absolute, nodes] of allImports) {
          const base = fsPath.basename(absolute);
          const relative = absolute.startsWith("/")
            ? "./" +
              fsPath.relative(
                fsPath.dirname(state.file.opts.filename),
                absolute
              )
            : absolute;

          const id = path.scope.generateUid(base);
          for (const node of nodes) node.name = id;
          newNodes.push(
            t.importDeclaration(
              [t.importNamespaceSpecifier(t.identifier(id))],
              t.stringLiteral(relative)
            )
          );
        }
        const newPaths = path.unshiftContainer("body", newNodes);
        for (const p of newPaths) p.scope.registerDeclaration(p);
      },
    },
  };
}

function pluginHelperHandleImport(handlers, fallback = () => {}) {
  const IMPORT = "::build-tool::";

  return function(path, state) {
    if (
      !path.get("source").isStringLiteral() ||
      !path.node.source.value.startsWith(IMPORT)
    ) {
      return fallback(path, state);
    }

    if (path.node.source.value === IMPORT) {
      for (const specifier of path.get("specifiers")) {
        const { node } = specifier;
        const handler = handlers[node.imported.name];
        const binding = path.scope.getBinding(node.local.name);
        for (const path of binding.referencePaths) handler(path.parentPath);
      }
    } else {
      const name = path.node.source.value.replace(IMPORT, "").split("/")[0];
      const handler = handlers[name];
      handler(path);
    }

    path.remove();
  };
}
