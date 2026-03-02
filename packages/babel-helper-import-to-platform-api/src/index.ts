import { type NodePath, types as t, template, type File } from "@babel/core";
import type { Targets } from "@babel/helper-compilation-targets";
import { addNamed } from "@babel/helper-module-imports";

import getSupport from "./platforms-support.ts";

function imp(file: File, name: string, module: string) {
  return addNamed(file.path, name, module, { importedType: "es6" });
}

export interface Pieces {
  commonJS?: (
    require: t.Expression,
    specifier: t.Expression,
    file: File,
  ) => t.Expression;
  webFetch: (fetch: t.Expression, file: File) => t.Expression;
  nodeFsSync: (read: t.Expression, file: File) => t.Expression;
  nodeFsAsync: (file: File) => t.Expression;
}

export interface Builders {
  buildFetch: (specifier: t.Expression, file: File) => t.Expression;
  buildFetchAsync: (specifier: t.Expression, file: File) => t.Expression;
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

  let buildFetchAsync: Builders["buildFetchAsync"];
  let buildFetchSync: Builders["buildFetch"];

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
      buildFetchSync = (specifier, file) =>
        transformers.commonJS(t.identifier("require"), specifier, file);
      break;
    case p({ web: true, node: true }):
      buildFetchAsync = (specifier, file) => {
        const web = transformers.webFetch(
          t.callExpression(t.identifier("fetch"), [
            (webSupportsIMR ? imr : imrWithFallback)(t.cloneNode(specifier)),
          ]),
          file,
        );
        const node = supportIsomorphicCJS
          ? template.expression.ast`
              import("module").then(module => ${transformers.commonJS(
                template.expression.ast`module.createRequire(import.meta.url)`,
                specifier,
                file,
              )})
            `
          : nodeSupportsIMR
            ? template.expression.ast`
                import("fs").then(
                  fs => ${readFileP(
                    t.identifier("fs"),
                    template.expression.ast`new URL(${imr(specifier)})`,
                  )}
                ).then(${transformers.nodeFsAsync(file)})
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
                  .then(${transformers.nodeFsAsync(file)})
              `;

        return template.expression.ast`
            typeof process === "object" && process.versions?.node
              ? ${node}
              : ${web}
          `;
      };
      break;
    case p({ web: true, node: false, webIMR: true }):
      buildFetchAsync = (specifier, file) =>
        transformers.webFetch(
          t.callExpression(t.identifier("fetch"), [imr(specifier)]),
          file,
        );
      break;
    case p({ web: true, node: false, webIMR: false }):
      buildFetchAsync = (specifier, file) =>
        transformers.webFetch(
          t.callExpression(t.identifier("fetch"), [imrWithFallback(specifier)]),
          file,
        );
      break;
    case p({ web: false, node: true, toCJS: true }):
      buildFetchSync = (specifier, file) =>
        transformers.nodeFsSync(
          template.expression.ast`
            require("fs").readFileSync(require.resolve(${specifier}))
          `,
          file,
        );
      buildFetchAsync = (specifier, file) => template.expression.ast`
            require("fs").promises.readFile(require.resolve(${specifier}))
              .then(${transformers.nodeFsAsync(file)})
          `;
      break;
    case p({
      web: false,
      node: true,
      toCJS: false,
      supportIsomorphicCJS: true,
    }):
      buildFetchSync = (specifier, file) =>
        transformers.commonJS(
          template.expression.ast`
            ${imp(file, "createRequire", "module")}(import.meta.url)
          `,
          specifier,
          file,
        );
      break;
    case p({ web: false, node: true, toCJS: false, nodeIMR: true }):
      buildFetchSync = (specifier, file) =>
        transformers.nodeFsSync(
          template.expression.ast`
            ${imp(file, "readFileSync", "fs")}(
              new URL(${imr(specifier)})
            )
          `,
          file,
        );
      buildFetchAsync = (specifier, file) =>
        template.expression.ast`
          ${imp(file, "promises", "fs")}
            .readFile(new URL(${imr(specifier)}))
            .then(${transformers.nodeFsAsync(file)})
        `;
      break;
    case p({ web: false, node: true, toCJS: false, nodeIMR: false }):
      buildFetchSync = (specifier, file) =>
        transformers.nodeFsSync(
          template.expression.ast`
            ${imp(file, "readFileSync", "fs")}(
              ${imp(file, "createRequire", "module")}(import.meta.url)
                .resolve(${specifier})
            )
          `,
          file,
        );
      buildFetchAsync = (specifier, file) =>
        transformers.webFetch(
          template.expression.ast`
            ${imp(file, "promises", "fs")}
              .readFile(
                ${imp(file, "createRequire", "module")}(import.meta.url)
                  .resolve(${specifier})
              )
          `,
          file,
        );
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
      buildFetch = (specifier, file) => {
        throw file.buildCodeFrameError(
          specifier,
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

function buildParallelStaticImports(
  data: { id: t.Identifier; fetch: t.Expression }[],
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

const PREV_PARALLEL_IMPORTS = new WeakMap<
  t.Program,
  {
    node: t.Statement;
    data: { id: t.Identifier; fetch: t.Expression }[];
    needsAwait: boolean;
  }
>();

export function injectParallelStaticImports(
  programPath: NodePath<t.Program>,
  data: { id: t.Identifier; fetch: t.Expression }[],
  needsAwait: boolean,
): void {
  if (data.length === 0) return;

  const program = programPath.node;
  const prev = PREV_PARALLEL_IMPORTS.get(program);
  let replacementIndex = -1;

  if (prev) {
    replacementIndex = program.body.indexOf(prev.node);
    if (replacementIndex === -1) {
      PREV_PARALLEL_IMPORTS.delete(program);
    } else {
      data = prev.data.concat(data);
      needsAwait ||= prev.needsAwait;
    }
  }

  const varDecl = buildParallelStaticImports(data, needsAwait);

  PREV_PARALLEL_IMPORTS.set(program, { node: varDecl, data, needsAwait });

  if (replacementIndex === -1) {
    programPath.unshiftContainer("body", varDecl);
  } else {
    programPath.get(`body.${replacementIndex}`).replaceWith(varDecl);
  }
}
