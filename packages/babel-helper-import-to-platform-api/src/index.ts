import { types as t, template } from "@babel/core";
import type { NodePath } from "@babel/traverse";
import type { Targets } from "@babel/helper-compilation-targets";
import { addNamed } from "@babel/helper-module-imports";

import getSupport from "./platforms-support.ts";

function imp(path: NodePath, name: string, module: string) {
  return addNamed(path, name, module, { importedType: "es6" });
}

export interface Pieces {
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
  const { needsNodeSupport, needsWebSupport, nodeSupportsIMR, webSupportsIMR } =
    getSupport(targets);

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
        const web = transformers.webFetch(
          t.callExpression(t.identifier("fetch"), [
            (webSupportsIMR ? imr : imrWithFallback)(t.cloneNode(specifier)),
          ]),
        );
        const node = nodeSupportsIMR
          ? template.expression.ast`
                import("fs").then(
                  fs => fs.promises.readFile(new URL(${imr(specifier)}))
                ).then(${transformers.nodeFsAsync()})
              `
          : template.expression.ast`
                Promise.all([import("fs"), import("module")])
                  .then(([fs, module]) =>
                    fs.promises.readFile(
                      module.createRequire(import.meta.url)
                        .resolve(${specifier})
                    )
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
    case p({ web: true, node: true, webIMR: false, nodeIMR: true }):
      buildFetchAsync = specifier => template.expression.ast`
          typeof process === "object" && process.versions?.node
            ? import("fs").then(fs =>
                ${transformers.nodeFsAsync()}(fs.readFileSync(
                  new URL(${imr(specifier)})
                ))
              )
            : ${transformers.webFetch(
              t.callExpression(t.identifier("fetch"), [
                imrWithFallback(specifier),
              ]),
            )}
        `;
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

  return {
    buildFetch: buildFetchSync || buildFetchAsync,
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
