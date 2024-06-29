import { types as t, template, type NodePath } from "@babel/core";
import type { Targets } from "@babel/helper-compilation-targets";
import { addNamed } from "@babel/helper-module-imports";

import getSupport from "./platforms-support.ts";

function imp(path: NodePath, name: string, module: string) {
  return addNamed(path, name, module, { importedType: "es6" });
}

export interface Pieces {
  commonJS?: (require: t.Expression, specifier: t.Expression) => t.Expression;
  webFetch: (fetch: t.Expression) => t.Expression;
  nodeFsSync: (read: t.Expression) => t.Expression;
  nodeFsAsync: () => t.Expression;
}

export interface Builders {
  buildFetch: (specifier: t.Expression, path: NodePath) => t.Expression;
  buildFetchAsync: (specifier: t.Expression, path: NodePath) => t.Expression;
  needsAwait: boolean;
}

const imr = (s: t.Expression) => template.expression.ast`
  import.meta.resolve(${s})
`;
const imrWithFallback = (s: t.Expression) => template.expression.ast`
  import.meta.resolve?.(${s}) ?? new URL(${t.cloneNode(s)}, import.meta.url)
`;

export function importToPlatformApi(
  targets: Targets,
  transformers: Pieces,
  toCommonJS: boolean,
) {
  const {
    needsNodeSupport,
    needsWebSupport,
    nodeSupportsIMR,
    webSupportsIMR,
    nodeSupportsFsPromises,
  } = getSupport(targets);
  const supportIsomorphicCJS = transformers.commonJS != null;

  let buildFetchAsync: (
    specifier: t.Expression,
    path: NodePath,
  ) => t.Expression;
  let buildFetchSync: typeof buildFetchAsync;

  // "p" stands for pattern matching :)
  const p = ({
    web: w = needsWebSupport,
    node: n = needsNodeSupport,
    nodeFSP: nF = nodeSupportsFsPromises,
    webIMR: wI = webSupportsIMR,
    nodeIMR: nI = nodeSupportsIMR,
    toCJS: c = toCommonJS,
    supportIsomorphicCJS: iC = supportIsomorphicCJS,
  }: {
    web?: boolean;
    node?: boolean;
    nodeFSP?: boolean;
    webIMR?: boolean;
    nodeIMR?: boolean;
    toCJS?: boolean;
    supportIsomorphicCJS?: boolean;
  }) =>
    +w +
    (+n << 1) +
    (+wI << 2) +
    (+nI << 3) +
    (+c << 4) +
    (+nF << 5) +
    (+iC << 6);

  const readFileP = (fs: t.Expression, arg: t.Expression) => {
    if (nodeSupportsFsPromises) {
      return template.expression.ast`${fs}.promises.readFile(${arg})`;
    }
    return template.expression.ast`
      new Promise(
        (a =>
          (r, j) => ${fs}.readFile(a, (e, d) => e ? j(e) : r(d))
        )(${arg})
      )`;
  };

  switch (
    p({
      web: needsWebSupport,
      node: needsNodeSupport,
      webIMR: webSupportsIMR,
      nodeIMR: nodeSupportsIMR,
      toCJS: toCommonJS,
    })
  ) {
    case p({ toCJS: true, supportIsomorphicCJS: true }):
      buildFetchSync = specifier =>
        transformers.commonJS(t.identifier("require"), specifier);
      break;
    case p({ web: true, node: true }):
      buildFetchAsync = specifier => {
        const web = transformers.webFetch(
          t.callExpression(t.identifier("fetch"), [
            (webSupportsIMR ? imr : imrWithFallback)(t.cloneNode(specifier)),
          ]),
        );
        const node = supportIsomorphicCJS
          ? template.expression.ast`
              import("module").then(module => ${transformers.commonJS(
                template.expression.ast`module.createRequire(import.meta.url)`,
                specifier,
              )})
            `
          : nodeSupportsIMR
            ? template.expression.ast`
                import("fs").then(
                  fs => ${readFileP(
                    t.identifier("fs"),
                    template.expression.ast`new URL(${imr(specifier)})`,
                  )}
                ).then(${transformers.nodeFsAsync()})
              `
            : template.expression.ast`
                Promise.all([import("fs"), import("module")])
                  .then(([fs, module]) =>
                    ${readFileP(
                      t.identifier("fs"),
                      template.expression.ast`
                        module.createRequire(import.meta.url).resolve(${specifier})
                      `,
                    )}
                  )
                  .then(${transformers.nodeFsAsync()})
              `;

        return template.expression.ast`
            typeof process === "object" && process.versions?.node
              ? ${node}
              : ${web}
          `;
      };
      break;
    case p({ web: true, node: false, webIMR: true }):
      buildFetchAsync = specifier =>
        transformers.webFetch(
          t.callExpression(t.identifier("fetch"), [imr(specifier)]),
        );
      break;
    case p({ web: true, node: false, webIMR: false }):
      buildFetchAsync = specifier =>
        transformers.webFetch(
          t.callExpression(t.identifier("fetch"), [imrWithFallback(specifier)]),
        );
      break;
    case p({ web: false, node: true, toCJS: true }):
      buildFetchSync = specifier =>
        transformers.nodeFsSync(template.expression.ast`
            require("fs").readFileSync(require.resolve(${specifier}))
          `);
      buildFetchAsync = specifier => template.expression.ast`
            require("fs").promises.readFile(require.resolve(${specifier}))
              .then(${transformers.nodeFsAsync()})
          `;
      break;
    case p({
      web: false,
      node: true,
      toCJS: false,
      supportIsomorphicCJS: true,
    }):
      buildFetchSync = (specifier, path) =>
        transformers.commonJS(
          template.expression.ast`
            ${imp(path, "createRequire", "module")}(import.meta.url)
          `,
          specifier,
        );
      break;
    case p({ web: false, node: true, toCJS: false, nodeIMR: true }):
      buildFetchSync = (specifier, path) =>
        transformers.nodeFsSync(template.expression.ast`
            ${imp(path, "readFileSync", "fs")}(
              new URL(${imr(specifier)})
            )
          `);
      buildFetchAsync = (specifier, path) =>
        template.expression.ast`
          ${imp(path, "promises", "fs")}
            .readFile(new URL(${imr(specifier)}))
            .then(${transformers.nodeFsAsync()})
        `;
      break;
    case p({ web: false, node: true, toCJS: false, nodeIMR: false }):
      buildFetchSync = (specifier, path) =>
        transformers.nodeFsSync(template.expression.ast`
            ${imp(path, "readFileSync", "fs")}(
              ${imp(path, "createRequire", "module")}(import.meta.url)
                .resolve(${specifier})
            )
          `);
      buildFetchAsync = (specifier, path) =>
        transformers.webFetch(template.expression.ast`
            ${imp(path, "promises", "fs")}
              .readFile(
                ${imp(path, "createRequire", "module")}(import.meta.url)
                  .resolve(${specifier})
              )
          `);
      break;
    default:
      throw new Error("Internal Babel error: unreachable code.");
  }

  buildFetchAsync ??= buildFetchSync;
  const buildFetchAsyncWrapped: typeof buildFetchAsync = (expression, path) => {
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

  let buildFetch = buildFetchSync;
  if (!buildFetchSync) {
    if (toCommonJS) {
      buildFetch = (specifier, path) => {
        throw path.buildCodeFrameError(
          "Cannot compile to CommonJS, since it would require top-level await.",
        );
      };
    } else {
      buildFetch = buildFetchAsync;
    }
  }

  return {
    buildFetch,
    buildFetchAsync: buildFetchAsyncWrapped,
    needsAwait: !buildFetchSync,
  };
}

export function buildParallelStaticImports(
  data: Array<{ id: t.Identifier; fetch: t.Expression }>,
  needsAwait: boolean,
): t.VariableDeclaration | null {
  if (data.length === 0) return null;

  const declarators: t.VariableDeclarator[] = [];

  if (data.length === 1) {
    let rhs = data[0].fetch;
    if (needsAwait) rhs = t.awaitExpression(rhs);
    declarators.push(t.variableDeclarator(data[0].id, rhs));
  } else if (needsAwait) {
    const ids = data.map(({ id }) => id);
    const fetches = data.map(({ fetch }) => fetch);
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
    for (const { id, fetch } of data) {
      declarators.push(t.variableDeclarator(id, fetch));
    }
  }

  return t.variableDeclaration("const", declarators);
}
