import { declare } from "@babel/helper-plugin-utils";
import type { NodePath } from "@babel/traverse";
import type { types as t, File } from "@babel/core";
import { addNamed } from "@babel/helper-module-imports";
import { isRequired } from "@babel/helper-compilation-targets";
import syntaxImportSourcePhase from "@babel/plugin-syntax-import-source";

// `import.meta.resolve` compat data.
// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta/resolve#browser_compatibility
// Once Node.js implements `fetch` of local files, we can re-use the web implementation for it
// similarly to how we do for Deno.
const imrCompatData = {
  compatData: {
    web: {
      chrome: "105.0.0",
      edge: "105.0.0",
      firefox: "106.0.0",
      opera: "91.0.0",
      safari: "16.4.0",
      opera_mobile: "72.0.0",
      ios: "16.4.0",
      samsung: "20.0",
      deno: "1.24.0",
    },
    node: {
      node: "20.6.0",
    },
  },
};

function isEmpty(obj: object) {
  return Object.keys(obj).length === 0;
}

function imp(path: NodePath, name: string, module: string) {
  return addNamed(path, name, module, { importedType: "es6" });
}

export default declare(api => {
  const { types: t, template } = api;
  api.assertVersion(
    process.env.BABEL_8_BREAKING && process.env.IS_PUBLISH
      ? PACKAGE_JSON.version
      : "^7.23.0",
  );

  const { node: nodeTarget, ...webTargets } = api.targets();
  const emptyNodeTarget = nodeTarget == null;
  const emptyWebTargets = isEmpty(webTargets);
  const needsNodeSupport = !emptyNodeTarget || emptyWebTargets;
  const needsWebSupport = !emptyWebTargets || emptyNodeTarget;

  const nodeSupportsIMR =
    !emptyNodeTarget &&
    !isRequired("node", { node: nodeTarget }, imrCompatData);
  const webSupportsIMR =
    !emptyWebTargets && !isRequired("web", webTargets, imrCompatData);

  let helperESM: ReturnType<typeof buildHelper>;
  let helperCJS: ReturnType<typeof buildHelper>;

  const getHelper = (file: File) => {
    const modules = file.get("@babel/plugin-transform-modules-*");
    if (modules === "commonjs") {
      return (helperCJS ??= buildHelper(true));
    }
    if (modules == null) {
      return (helperESM ??= buildHelper(false));
    }
    throw new Error(
      `@babel/plugin-proposal-import-wasm-source can only be used when not ` +
        `compiling modules, or when compiling them to CommonJS.`,
    );
  };

  return {
    name: "proposal-import-wasm-source",

    inherits: syntaxImportSourcePhase,

    visitor: {
      Program(path) {
        if (path.node.sourceType !== "module") return;

        const helper = getHelper(this.file);

        // TS reports that 'Assertions require every name in the call target to be
        // declared with an explicit type annotation.' if we just call
        // t.assertImportDefaultSpecifier, so we _explicitly_ annotate `t` as
        // having type `typeof t`. Unfortunately this is a design limitation of
        // the TS type checker, so we need to manually help it:
        // https://github.com/microsoft/TypeScript/issues/36931
        const t2: typeof t = t;

        const ids: t.Identifier[] = [];
        const fetches: t.Expression[] = [];
        for (const decl of path.get("body")) {
          if (!decl.isImportDeclaration({ phase: "source" })) continue;

          if (decl.node.attributes?.length || decl.node.assertions?.length) {
            throw path.buildCodeFrameError(
              "`import source` with import attributes cannot be compiled.",
            );
          }

          const specifier = decl.node.specifiers[0];
          t2.assertImportDefaultSpecifier(specifier);

          ids.push(specifier.local);
          fetches.push(helper.buildFetch(decl.node.source, path));
          decl.remove();
        }
        if (ids.length === 0) return;

        const declarators: t.VariableDeclarator[] = [];
        if (ids.length === 1) {
          let rhs = fetches[0];
          if (helper.needsAwait) rhs = t.awaitExpression(rhs);
          declarators.push(t.variableDeclarator(ids[0], rhs));
        } else if (helper.needsAwait) {
          declarators.push(
            t.variableDeclarator(
              t.arrayPattern(ids),
              t.awaitExpression(
                template.expression.ast`
                  Promise.all(${t.arrayExpression(fetches)})
                `,
              ),
            ),
          );
        } else {
          for (let i = 0; i < ids.length; i++) {
            declarators.push(t.variableDeclarator(ids[i], fetches[i]));
          }
        }

        path.unshiftContainer(
          "body",
          t.variableDeclaration("const", declarators),
        );
      },

      ImportExpression(path) {
        if (path.node.phase !== "source") return;

        if (path.node.options) {
          throw path.buildCodeFrameError(
            "`import.source` with an options bag cannot be compiled.",
          );
        }

        path.replaceWith(
          getHelper(this.file).buildFetchAsync(path.node.source, path),
        );
      },
    },
  };

  function buildHelper(toCommonJS: boolean) {
    let buildFetchAsync: (
      specifier: t.Expression,
      path: NodePath,
    ) => t.Expression;
    let buildFetchSync: typeof buildFetchAsync;

    // "p" stands for pattern matching :)
    const p = ({
      web: w,
      node: n,
      webIMR: wI = webSupportsIMR,
      nodeIMR: nI = nodeSupportsIMR,
      toCJS: c = toCommonJS,
    }: {
      web: boolean;
      node: boolean;
      webIMR?: boolean;
      nodeIMR?: boolean;
      toCJS?: boolean;
      preferSync?: boolean;
    }) => +w + (+n << 1) + (+wI << 2) + (+nI << 3) + (+c << 4);

    const imr = (s: t.Expression) => template.expression.ast`
      import.meta.resolve(${s})
    `;
    const imrWithFallback = (s: t.Expression) => template.expression.ast`
      import.meta.resolve?.(${s}) ??
      new URL(${t.cloneNode(s)}, import.meta.url)
    `;

    switch (
      p({
        web: needsWebSupport,
        node: needsNodeSupport,
        webIMR: webSupportsIMR,
        nodeIMR: nodeSupportsIMR,
        toCJS: toCommonJS,
      })
    ) {
      case p({ web: true, node: true }):
        buildFetchAsync = specifier => {
          const web = template.expression.ast`
            WebAssembly.compileStreaming(fetch(
              ${(webSupportsIMR ? imr : imrWithFallback)(
                t.cloneNode(specifier),
              )}
            ))
          `;
          const node = nodeSupportsIMR
            ? template.expression.ast`
                import("fs")
                  .then(fs => fs.promises.readFile(new URL(${imr(specifier)})))
                  .then(WebAssembly.compile)
              `
            : template.expression.ast`
                Promise.all([import("fs"), import("module")])
                  .then(([fs, module]) =>
                    fs.promises.readFile(
                      module.createRequire(import.meta.url)
                        .resolve(${specifier})
                    )
                  )
                  .then(WebAssembly.compile)
              `;
          return template.expression.ast`
            typeof process === "object" && process.versions?.node
              ? ${node}
              : ${web}
          `;
        };
        break;
      case p({ web: true, node: true, webIMR: false, nodeIMR: true }):
        buildFetchAsync = specifier => template.expression.ast`
          typeof process === "object" && process.versions?.node
            ? import("fs").then(fs =>
                new WebAssembly.Module(fs.readFileSync(
                  new URL(${imr(specifier)})
                ))
              )
            : WebAssembly.compileStreaming(fetch(${imrWithFallback(specifier)}))
        `;
        break;
      case p({ web: true, node: false, webIMR: true }):
        buildFetchAsync = specifier => template.expression.ast`
          WebAssembly.compileStreaming(fetch(${imr(specifier)}))
        `;
        break;
      case p({ web: true, node: false, webIMR: false }):
        buildFetchAsync = specifier => template.expression.ast`
          WebAssembly.compileStreaming(fetch(${imrWithFallback(specifier)}))
        `;
        break;
      case p({ web: false, node: true, toCJS: true }):
        buildFetchSync = specifier => template.expression.ast`
          new WebAssembly.Module(
            require("fs").readFileSync(
              require.resolve(${specifier})
            )
          )
        `;
        buildFetchAsync = specifier => template.expression.ast`
          require("fs").promises.readFile(require.resolve(${specifier}))
            .then(WebAssembly.compile)
        `;
        break;
      case p({ web: false, node: true, toCJS: false, nodeIMR: true }):
        buildFetchSync = (specifier, path) => template.expression.ast`
          new WebAssembly.Module(
            ${imp(path, "readFileSync", "fs")}(
              new URL(${imr(specifier)})
            )
          )
        `;
        buildFetchAsync = (specifier, path) => template.expression.ast`
          ${imp(path, "promises", "fs")}
            .readFile(new URL(${imr(specifier)}))
            .then(WebAssembly.compile)
        `;
        break;
      case p({ web: false, node: true, toCJS: false, nodeIMR: false }):
        buildFetchSync = (specifier, path) => template.expression.ast`
          new WebAssembly.Module(
            ${imp(path, "readFileSync", "fs")}(
              ${imp(path, "createRequire", "module")}(import.meta.url)
                .resolve(${specifier})
            )
          )
        `;
        buildFetchAsync = (specifier, path) => template.expression.ast`
          ${imp(path, "promises", "fs")}
            .readFile(
              ${imp(path, "createRequire", "module")}(import.meta.url)
                .resolve(${specifier})
            )
            .then(WebAssembly.compile)
        `;
        break;
      default:
        throw new Error("Internal Babel error: unreachable code.");
    }

    buildFetchAsync ??= buildFetchSync;
    const buildFetchAsyncWrapped: typeof buildFetchAsync = (
      expression,
      path,
    ) => {
      if (t.isStringLiteral(expression)) {
        return template.expression.ast`
          Promise.resolve().then(() => ${buildFetchAsync(expression, path)})
        `;
      } else {
        return template.expression.ast`
          Promise.resolve(\`\${${expression}}\`).then((s) => ${buildFetchAsync(
            t.identifier("s"),
            path,
          )})
        `;
      }
    };

    return {
      buildFetch: buildFetchSync || buildFetchAsync,
      buildFetchAsync: buildFetchAsyncWrapped,
      needsAwait: !buildFetchSync,
    };
  }
});
