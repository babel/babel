import path from "node:path";
import fs from "node:fs";
import { cpus } from "node:os";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { Transform as TransformStream } from "node:stream";
import { callbackify } from "node:util";
import colors from "node-style-text";
// @ts-expect-error no types
import gulp from "gulp";
import { rollup } from "rollup";
import {
  babel as rollupBabel,
  getBabelOutputPlugin,
} from "@rollup/plugin-babel";
import rollupCommonJs from "@rollup/plugin-commonjs";
import rollupJson from "@rollup/plugin-json";
import rollupPolyfillNode from "rollup-plugin-polyfill-node";
import rollupNodeResolve from "@rollup/plugin-node-resolve";
import rollupReplace from "@rollup/plugin-replace";
import rollupTerser from "@rollup/plugin-terser";
import rollupDts from "rollup-plugin-dts";
import { Worker as JestWorker } from "jest-worker";
import { Glob } from "glob";

// @ts-expect-error no types
import rollupBabelSource from "./scripts/rollup-plugin-babel-source.js";
// @ts-expect-error no types
import rollupStandaloneInternals from "./scripts/rollup-plugin-standalone-internals.js";
// @ts-expect-error no types
import rollupDependencyCondition from "./scripts/rollup-plugin-dependency-condition.js";
// @ts-expect-error no types
import babelPluginToggleBooleanFlag from "./scripts/babel-plugin-toggle-boolean-flag/plugin.cjs";
// @ts-expect-error no types
import formatCode from "./scripts/utils/formatCode.js";
// @ts-expect-error no types
import { log } from "./scripts/utils/logger.js";
import { commonJS } from "$repo-utils";

import type { NodePath, PluginItem, types } from "@babel/core";

const { require, __dirname: monorepoRoot } = commonJS(import.meta.url);

const defaultPackagesGlob = "./@(codemods|packages|eslint)/*";
const defaultSourcesGlob = [
  `${defaultPackagesGlob}/src/**/{*.js,*.cjs,!(*.d).ts,!(*.d).cts}`,
  "!./packages/babel-helpers/src/helpers/*",
];

const babelStandalonePluginConfigGlob =
  "./packages/babel-standalone/scripts/pluginConfig.json";

const buildTypingsWatchGlob = [
  "./packages/babel-types/lib/definitions/**/*.js",
  "./packages/babel-types/scripts/generators/*.ts",
];

// env vars from the cli are always strings, so !!ENV_VAR returns true for "false"
function bool(value: string | undefined): boolean {
  return Boolean(value) && value !== "false" && value !== "0";
}

/**
 * map source code path to the generated artifacts path
 * @example
 * mapSrcToLib("packages/babel-core/src/index.js")
 * // returns "packages/babel-core/lib/index.js"
 * @example
 * mapSrcToLib("packages/babel-template/src/index.ts")
 * // returns "packages/babel-template/lib/index.js"
 * @example
 * mapSrcToLib("packages/babel-template/src/index.d.ts")
 * // returns "packages/babel-template/lib/index.d.ts"
 */
function mapSrcToLib(srcPath: string): string {
  const parts = srcPath
    .replace(/(?<!\.d)\.ts$/, ".js")
    .replace(/(?<!\.d)\.cts$/, ".cjs")
    .split("/");
  parts[2] = "lib";
  return parts.join("/");
}

function mapToDts(packageName: string): string {
  return packageName.replace(
    /(?<=\\|\/|^)(packages|eslint|codemods)(?=\\|\/)/,
    "dts/$1"
  );
}

function getIndexFromPackage(name: string): string {
  try {
    fs.statSync(`./${name}/src/index.ts`);
    return `${name}/src/index.ts`;
  } catch {
    return `${name}/src/index.js`;
  }
}

async function generateHelpers(
  generator: string,
  dest: string,
  filename: string,
  message: string
) {
  const { default: generateCode } = await import(generator);
  const result = await formatCode(
    await generateCode(filename),
    path.join(dest, filename)
  );
  fs.writeFileSync(path.join(dest, filename), result, { mode: 0o644 });
  log(`${colors.green("✔")} Generated ${message}`);
}

type TypesHelperKind =
  | "asserts"
  | "ast-types"
  | "builders"
  | "constants"
  | "validators";

function generateTypeHelpers(
  helperKind: TypesHelperKind,
  filename = "index.ts"
) {
  return generateHelpers(
    `./packages/babel-types/scripts/generators/${helperKind}.ts`,
    `./packages/babel-types/src/${helperKind}/generated/`,
    filename,
    `@babel/types -> ${helperKind}`
  );
}

type TraverseHelperKind = "asserts" | "validators" | "visitor-types";

function generateTraverseHelpers(helperKind: TraverseHelperKind, outBase = "") {
  return generateHelpers(
    `./packages/babel-traverse/scripts/generators/${helperKind}.ts`,
    `./packages/babel-traverse/src/${outBase}/generated/`,
    `${helperKind}.d.ts`,
    `@babel/traverse -> ${helperKind}`
  );
}

function generateHelperGlobalsData(filename: string) {
  return generateHelpers(
    `./packages/babel-helper-globals/scripts/generate.mjs`,
    `./packages/babel-helper-globals/data/`,
    filename,
    `@babel/helper-globals -> ${filename}`
  );
}

async function applyBabelToSource(
  inputCode: string,
  filename: string,
  options: any
) {
  const { transformAsync } = await import("@babel/core");
  return transformAsync(inputCode, {
    configFile: false,
    filename,
    ...options,
    parserOpts: {
      tokens: true,
      ...options?.parserOpts,
    },
    generatorOpts: {
      retainLines: true,
      experimental_preserveFormat: true,
      ...options?.generatorOpts,
    },
  }).then(res => formatCode(res!.code, filename));
}

function applyBabelToGlob(glob: any, options: any) {
  const promises = [];

  const ac = new AbortController();

  for (const file of glob) {
    promises.push(
      fs.promises
        .readFile(file, "utf-8")
        .then(code => {
          ac.signal.throwIfAborted();
          return applyBabelToSource(code, file, options);
        })
        .then(transformedCode => {
          ac.signal.throwIfAborted();
          return fs.promises.writeFile(file, transformedCode);
        })
    );
  }

  return Promise.all(promises).catch(err => {
    ac.abort();
    throw err;
  });
}

const kebabToCamel = (str: string) =>
  str.replace(/-[a-z]/g, c => c[1].toUpperCase());

function generateStandalone() {
  const dest = "./packages/babel-standalone/src/generated/";
  return gulp
    .src(babelStandalonePluginConfigGlob, { base: monorepoRoot })
    .pipe(
      new TransformStream({
        objectMode: true,
        // @ts-expect-error FIXME
        transform: callbackify(async file => {
          log("Generating @babel/standalone files");
          const pluginConfig = JSON.parse(file.contents);
          let imports = `import makeNoopPlugin from "../make-noop-plugin.ts";`;
          let exportDecls = "";
          let exportsList = "";
          let allList = "";

          for (const plugin of pluginConfig.noopPlugins) {
            const camelPlugin = kebabToCamel(plugin);
            exportDecls += `${camelPlugin} = makeNoopPlugin(),`;
            allList += `"${plugin}": ${camelPlugin},`;
          }

          for (const plugin of pluginConfig.externalPlugins) {
            const camelPlugin = kebabToCamel(plugin);
            imports += `import ${camelPlugin} from "@babel/plugin-${plugin}";`;
            exportsList += `${camelPlugin},`;
            allList += `"${plugin}": ${camelPlugin},`;
          }

          const fileContents = `/*
   * This file is auto-generated! Do not modify it directly.
   * To re-generate run 'yarn gulp generate-standalone'
   */
  ${imports}
  export const ${exportDecls.slice(0, -1)};
  export {${exportsList}};
  export const all: Record<string, any> = {${allList}};`;
          file.path = "plugins.ts";
          file.contents = Buffer.from(
            await formatCode(fileContents, dest + file.path)
          );

          return file;
        }),
      })
    )
    .pipe(gulp.dest(dest));
}

function createWorker(useWorker: boolean) {
  const numWorkers = Math.ceil(Math.max(cpus().length, 1) / 2) - 1;
  if (
    numWorkers === 0 ||
    !useWorker ||
    // For some reason, on CircleCI the workers hang indefinitely.
    process.env.CIRCLECI
  ) {
    // @ts-expect-error no types
    return import("./babel-worker.mjs");
  }
  const worker = new JestWorker(
    new URL("./babel-worker.mjs", import.meta.url),
    {
      enableWorkerThreads: true,
      numWorkers,
      exposedMethods: ["transform"],
    }
  );

  worker.getStdout().pipe(process.stdout);
  worker.getStderr().pipe(process.stderr);
  return worker;
}

async function buildBabel(useWorker: boolean, ignore: PackageInfo[] = []) {
  const worker = await createWorker(useWorker);
  const files = new Glob(defaultSourcesGlob, {
    ignore: ignore.map(p => `${p.src}/**`),
    posix: true,
  });

  const promises = [];
  for await (const file of files) {
    // @example ./packages/babel-parser/src/index.js
    const dest = "./" + mapSrcToLib(file);
    promises.push(
      worker.transform(file, dest, {
        sourceMaps: !file.endsWith(".d.ts"),
      })
    );
  }
  return Promise.allSettled(promises)
    .then(results => {
      results.forEach(result => {
        if (result.status === "rejected") {
          if (process.env.WATCH_SKIP_BUILD) {
            console.error(result.reason);
          } else {
            throw result.reason;
          }
        }
      });
    })
    .finally(() => {
      worker.end?.();
    });
}

/**
 * Resolve a nested dependency starting from the given file
 */
function resolveChain(baseUrl: string, ...packages: string[]) {
  const require = createRequire(baseUrl);

  return packages.reduce(
    (base, pkg) =>
      path.dirname(require.resolve(pkg + "/package.json", { paths: [base] })),
    path.dirname(fileURLToPath(baseUrl))
  );
}

// If this build is part of a pull request, include the pull request number in
// the version number.
let versionSuffix = "";
if (process.env.CIRCLE_PR_NUMBER) {
  versionSuffix = "+pr." + process.env.CIRCLE_PR_NUMBER;
}

const babelVersion =
  require("./packages/babel-core/package.json").version + versionSuffix;
function buildRollup(packages: PackageInfo[], buildStandalone?: boolean) {
  const sourcemap = process.env.NODE_ENV === "production";
  return Promise.all(
    packages.map(
      async ({
        src,
        format,
        input,
        dest,
        name,
        filename,
        envName = "rollup",
      }) => {
        const pkgJSON = require("./" + src + "/package.json");
        const version = pkgJSON.version + versionSuffix;
        const { dependencies = {}, peerDependencies = {} } = pkgJSON;
        const external = [
          ...Object.keys(dependencies),
          ...Object.keys(peerDependencies),
          // @babel/compat-data sub exports
          /@babel\/compat-data\/.*/,
          // @babel/helper-globals sub exports
          /@babel\/helper-globals\/.*/,
          // Ideally they should be constructed from package.json exports
          // required by modules-commonjs
          /babel-plugin-dynamic-import-node\/utils/,
          // required by preset-env
          /@babel\/preset-modules\/.*/,
        ];

        log(`Compiling '${colors.cyan(input)}' with rollup ...`);
        const bundle = await rollup({
          input,
          external: buildStandalone ? [] : external,
          // all node modules are resolved as if they were placed in the n_m folder of package root
          preserveSymlinks: true,
          onwarn(warning, warn) {
            switch (warning.code) {
              case "CIRCULAR_DEPENDENCY":
              case "SOURCEMAP_ERROR": // Rollup warns about the babel-polyfills source maps
              case "INCONSISTENT_IMPORT_ATTRIBUTES": // @rollup/plugin-commonjs transforms require("...json") to an import without attributes
                return;
              case "UNUSED_EXTERNAL_IMPORT":
                warn(warning);
                return;
              case "MISSING_EXPORT":
                // Rollup warns about using babel.default at
                // https://github.com/babel/babel-polyfills/blob/4ac92be5b70b13e3d8a34614d8ecd900eb3f40e4/packages/babel-helper-define-polyfill-provider/src/types.js#L5
                // We can safely ignore this warning, and let Rollup replace it with undefined.
                if (
                  // @ts-expect-error warning.exporter is defined when code is MISSING_EXPORT
                  warning.exporter
                    .replace(/\\/g, "/")
                    .endsWith("packages/babel-core/src/index.ts") &&
                  warning.binding === "default" &&
                  [
                    "@babel/helper-define-polyfill-provider",
                    "babel-plugin-polyfill-corejs3",
                    "babel-plugin-polyfill-regenerator",
                    // @ts-expect-error warning.id is defined when code is MISSING_EXPORT
                  ].some(pkg => warning.id.replace(/\\/g, "/").includes(pkg))
                ) {
                  return;
                }
            }

            // We use console.warn here since it prints more info than just "warn",
            // in case we want to stop throwing for a specific message.
            console.warn(warning);

            // https://github.com/babel/babel/pull/12011#discussion_r540434534
            throw new Error("Rollup aborted due to warnings above");
          },
          plugins: [
            buildStandalone && rollupStandaloneInternals(),
            rollupBabelSource(),
            process.env.STRIP_BABEL_VERSION_FLAG &&
              rollupDependencyCondition(bool(process.env.BABEL_9_BREAKING)),
            rollupReplace({
              preventAssignment: true,
              values: {
                "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
                BABEL_VERSION: JSON.stringify(babelVersion),
                VERSION: JSON.stringify(version),
              },
            }),
            rollupCommonJs({
              include: [
                // Bundle node_modules only when building standalone
                buildStandalone ? /node_modules/ : "./node_modules/*/*.js",
                "packages/babel-runtime/regenerator/**",
                "packages/babel-runtime/helpers/*.js",
                "packages/babel-preset-env/data/*.js",
                // Rollup doesn't read export maps, so it loads the cjs fallback
                "packages/babel-compat-data/*.js",
                // Used by @babel/standalone
                "packages/babel-compat-data/scripts/data/legacy-plugin-aliases.js",
                "packages/*/src/**/*.cjs",
              ],
              dynamicRequireTargets: [
                // https://github.com/mathiasbynens/regexpu-core/blob/ffd8fff2e31f4597f6fdfee75d5ac1c5c8111ec3/rewrite-pattern.js#L48
                resolveChain(
                  import.meta.url,
                  "./packages/babel-helper-create-regexp-features-plugin",
                  "regexpu-core",
                  "regenerate-unicode-properties"
                ).replace(/\\/g, "/") + "/**/*.js", // Must be posix path in rollup 3
              ],
              // Never delegate to the native require()
              ignoreDynamicRequires: false,
              // Align with the Node.js behavior
              defaultIsModuleExports: true,
            }),
            rollupBabel({
              envName,
              babelHelpers: "bundled",
              configFile: "./babel.config.js",
              extensions: [".ts", ".js", ".mjs", ".cjs"],
              ignore: ["packages/babel-runtime/helpers/*.js"],
            }),
            buildStandalone && {
              resolveId: {
                order: "post",
                // This is needed because @jridgewell's packages always use
                // the UMD version when targeting browsers, but we need to use
                // the ESM version so that it can be bundled.
                handler(importee: string) {
                  if (/@jridgewell[\\/].*\.umd\.js$/.test(importee)) {
                    return importee.slice(0, -".umd.js".length) + ".mjs";
                  }
                },
              },
            },
            rollupNodeResolve({
              extensions: [".ts", ".js", ".mjs", ".cjs", ".json"],
              browser: buildStandalone,
              exportConditions: buildStandalone ? ["browser"] : [],
              // It needs to be set to 'false' when using rollupNodePolyfills
              // https://github.com/rollup/plugins/issues/772
              preferBuiltins: !buildStandalone,
            }),
            rollupJson(),
            src === "packages/babel-parser" &&
              getBabelOutputPlugin({
                configFile: false,
                babelrc: false,
                generatorOpts: {
                  compact: false,
                },
                plugins: [
                  function babelPluginInlineConstNumericObjects(api) {
                    // @ts-expect-error FIXME: add `types` in types
                    const t = api.types as typeof types;
                    return {
                      visitor: {
                        VariableDeclarator(path) {
                          const { node } = path;
                          if (
                            !t.isIdentifier(node.id) ||
                            !t.isObjectExpression(node.init)
                          ) {
                            return;
                          }

                          const binding = path.scope.getBinding(node.id.name)!;
                          if (!binding.constant) return;

                          const vals = new Map();
                          for (const { key, value } of node.init
                            .properties as types.ObjectProperty[]) {
                            if (!t.isIdentifier(key)) return;
                            if (!t.isNumericLiteral(value)) return;
                            vals.set(key.name, value.value);
                          }

                          let all = true;
                          binding.referencePaths.forEach(({ parentPath }) => {
                            const { node } = parentPath;
                            if (
                              !t.isMemberExpression(node) ||
                              !t.isIdentifier(node.property) ||
                              node.computed ||
                              !vals.has(node.property.name)
                            ) {
                              all = false;
                              return;
                            }
                            parentPath.replaceWith(
                              t.numericLiteral(vals.get(node.property.name))
                            );
                          });

                          if (all) path.remove();
                        },
                      },
                    };
                  } satisfies PluginItem,
                ],
              }),
            buildStandalone &&
              rollupPolyfillNode({
                sourceMap: sourcemap,
                include: "**/*.{js,mjs,cjs,ts}",
              }),
            // https://github.com/babel/babel/issues/14301
            buildStandalone &&
              rollupReplace({
                preventAssignment: false,
                delimiters: ["", ""],
                values: {
                  "return require.resolve(path);":
                    "throw new Error('Babel internal error');",
                },
              }),
          ].filter(Boolean),
        });

        const outputFile = path.join(src, dest, filename || "index.js");
        await bundle.write({
          esModule: true,
          file: outputFile,
          format,
          importAttributesKey: "with",
          name,
          sourcemap: sourcemap,
          exports: "named",
          interop(id) {
            if (!id) return "default";
            // We have manually applied commonjs-esm interop to the source
            // for library not in this monorepo
            // https://github.com/babel/babel/pull/12795
            if (!id.startsWith("@babel/")) return "default";

            // Some syntax plugins have been archived
            if (id.includes("plugin-syntax")) {
              const srcPath = path.join(
                path.dirname(fileURLToPath(import.meta.url)),
                "/packages/" + id.replace("@babel/", "babel-")
              );
              if (!fs.existsSync(srcPath)) return "default";
            }

            if (id.includes("@babel/preset-modules")) {
              return "default";
            }

            return "auto";
          },
        });

        // Only minify @babel/standalone
        if (!buildStandalone) {
          return;
        }

        if (!process.env.IS_PUBLISH) {
          log(
            colors.yellow(
              `Skipped minification of '${colors.cyan(
                outputFile
              )}' because not publishing`
            )
          );
          return undefined;
        }
        log(`Minifying '${colors.cyan(outputFile)}'...`);

        await bundle.write({
          file: outputFile.replace(/\.js$/, ".min.js"),
          format,
          esModule: true,
          interop: "compat",
          name,
          sourcemap: sourcemap,
          exports: "named",
          plugins: [
            rollupTerser({
              // workaround https://bugs.webkit.org/show_bug.cgi?id=212725
              format: {
                ascii_only: true,
              },
              maxWorkers: process.env.CIRCLECI ? 1 : undefined,
            }),
          ],
        });
      }
    )
  );
}

function buildRollupDts(packages: string[]) {
  async function build(
    input: string,
    output: string,
    banner: string,
    packageName: string
  ) {
    log(`Bundling '${colors.cyan(output)}' with rollup ...`);

    let external;
    if (packageName) {
      const pkgJSON = require("./" + packageName + "/package.json");
      const {
        dependencies = {},
        devDependencies = {},
        peerDependencies = {},
      } = pkgJSON;
      external = [
        ...Object.keys(dependencies),
        ...Object.keys(peerDependencies),
        // TODO: These should all be moved to dependencies
        ...Object.keys(devDependencies),
      ].map(dep => new RegExp(`^${dep}(?:/.+)?$`));
    }

    const bundle = await rollup({
      input,
      plugins: [
        {
          name: "rollup-babel-internal-define-BABEL_8_BREAKING",
          transform: code =>
            code.replace(
              /type BABEL_8_BREAKING\s*=\s*boolean/g,
              `type BABEL_8_BREAKING = true`
            ),
        },
        rollupDts(),
      ],
      external,
      onwarn(warning) {
        if (
          warning.code === "UNUSED_EXTERNAL_IMPORT" &&
          // @ts-expect-error warning.names are defined when code is UNUSED_EXTERNAL_IMPORT
          warning.names.length === 1 &&
          // @ts-expect-error warning.names are defined when code is UNUSED_EXTERNAL_IMPORT
          warning.names[0] === "default"
        ) {
          // rollup-plugin-dts doesn't like default imports when they are just re-exported
          return;
        }
        if (warning.code === "UNRESOLVED_IMPORT" && warning.exporter === "vm") {
          // TODO: We probably need @types/node
          return;
        }
        console.warn(warning);
      },
    });

    await bundle.write({
      file: output,
      format: "es",
      banner,
    });
  }

  const tasks = packages.map(async (packageName: string) => {
    const input = `${mapToDts(packageName)}/src/index.d.ts`;
    const output = `${packageName}/lib/index.d.ts`;

    await build(input, output, "", packageName);
  });

  tasks.push(
    build(
      "packages/babel-parser/typings/babel-parser.source.d.ts",
      "packages/babel-parser/typings/babel-parser.d.ts",
      "// This file is auto-generated! Do not modify it directly.\n" +
        "// Run `yarn gulp bundle-dts` to re-generate it.\n" +
        // @typescript-eslint/no-redundant-type-constituents can be removed once we drop the IF_BABEL_7 type
        "/* eslint-disable @typescript-eslint/consistent-type-imports, @typescript-eslint/no-redundant-type-constituents */",
      "packages/babel-parser"
    )
  );

  return Promise.all(tasks);
}

function* packagesIterator(exclude: Set<string>) {
  for (const packageDir of ["packages", "codemods"]) {
    for (const dir of fs.readdirSync(new URL(packageDir, import.meta.url))) {
      const src = `${packageDir}/${dir}`;
      if (exclude.has(src)) continue;
      if (!fs.existsSync(new URL(`${src}/package.json`, import.meta.url))) {
        continue;
      }
      yield src;
    }
  }
}

function* libBundlesIterator(): IterableIterator<PackageInfo> {
  const noBundle = new Set(
    [
      // @rollup/plugin-commonjs will mess up with babel-helper-fixtures
      "babel-helper-fixtures",
      // babel-standalone is handled by rollup-babel-standalone task
      "babel-standalone",
      // todo: Rollup hangs on allowHashBang: true with babel-cli/src/babel/index.ts hashbang
      "babel-cli",
      // todo: @rollup/node-resolve 'browsers' option does not work when package.json contains `exports`
      // https://github.com/rollup/plugins/tree/master/packages/node-resolve#browser
      "babel-register",
      "babel-core",
      "babel-plugin-transform-runtime",
      // @babel/node invokes internal lib/_babel-node.js
      "babel-node",
      // todo: test/helpers/define-helper requires internal lib/helpers access
      "babel-helpers",
      // multiple exports
      "babel-plugin-transform-react-jsx",
      // rollup bug https://github.com/babel/babel/pull/16001
      "babel-helper-builder-react-jsx",
      // exit-loader.cjs
      "babel-helper-transform-fixture-test-runner",
    ].map(n => `packages/${n}`)
  );
  for (const src of packagesIterator(noBundle)) {
    const pkgJSON = JSON.parse(
      fs.readFileSync(new URL(`${src}/package.json`, import.meta.url), "utf-8")
    );
    if (pkgJSON.main) {
      yield {
        src,
        format: "esm",
        dest: "lib",
        input: getIndexFromPackage(src),
      };
    } else if (pkgJSON.bin) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      for (const binPath of Object.values(pkgJSON.bin) as string[]) {
        const filename = binPath.slice(binPath.lastIndexOf("/") + 1);
        const input =
          src === "packages/babel-cli" && filename === "babel.js"
            ? `${src}/src/babel/index.ts`
            : `${src}/src/${filename.slice(0, -3) + ".ts"}`;
        yield {
          src,
          format: "esm",
          dest: "lib",
          filename,
          input,
        };
      }
    }
  }
}

type PackageInfo = {
  src: string;
  format: "cjs" | "esm" | "umd";
  dest: string;
  input: string;
  name?: string;
  filename?: string;
  envName?: string;
};

const libBundles: PackageInfo[] = Array.from(libBundlesIterator());

const dtsBundles = Array.from(
  packagesIterator(
    new Set([
      // CLIs
      "packages/babel-cli",
      "packages/babel-node",
      // This will be just JSON
      "packages/babel-compat-data",
      "packages/babel-helper-globals",
      // Not meant to be consumed manually
      "packages/babel-runtime",
      "packages/babel-runtime-corejs3",
      // TODO: Add type definitions
      "packages/babel-register",
    ])
  )
);

const standaloneBundle = [
  {
    src: "packages/babel-standalone",
    format: "umd" as const,
    name: "Babel",
    filename: "babel.js",
    dest: "",
    version: babelVersion,
    envName: "standalone",
    input: getIndexFromPackage("packages/babel-standalone"),
  },
];

gulp.task("generate-helper-globals-data", () => {
  log("Generating @babel/helper-globals data");

  return Promise.all([
    generateHelperGlobalsData("browser-upper.json"),
    generateHelperGlobalsData("builtin-lower.json"),
    generateHelperGlobalsData("builtin-upper.json"),
  ]);
});

gulp.task("generate-type-helpers", () => {
  log("Generating @babel/types and @babel/traverse dynamic functions");

  return Promise.all([
    generateTypeHelpers("asserts"),
    generateTypeHelpers("builders", "lowercase.ts"),
    generateTypeHelpers("builders", "uppercase.ts"),
    generateTypeHelpers("builders"),
    generateTypeHelpers("constants"),
    generateTypeHelpers("validators"),
    generateTypeHelpers("ast-types"),
    generateTraverseHelpers("asserts", "path"),
    generateTraverseHelpers("validators", "path"),
    generateTraverseHelpers("visitor-types"),
  ]);
});

gulp.task("generate-runtime-helpers", async () => {
  log("Generating @babel/helpers runtime helpers");

  await generateHelpers(
    `./packages/babel-helpers/scripts/generate-helpers.js`,
    `./packages/babel-helpers/src/`,
    "helpers-generated.ts",
    "@babel/helpers"
  );
});

gulp.task("generate-standalone", () => generateStandalone());

gulp.task("materialize-babel-8-src", () =>
  applyBabelToGlob(new Glob(defaultSourcesGlob, { posix: true }), {
    plugins: [
      [
        babelPluginToggleBooleanFlag,
        { name: "process.env.BABEL_8_BREAKING", value: true },
      ],
      [
        babelPluginToggleBooleanFlag,
        { name: "USE_ESM", value: true },
        "USE_ESM",
      ],
      (api: any) => ({
        visitor: {
          SpreadElement: {
            exit(path: any) {
              const { argument } = path.node;
              if (api.types.isObjectExpression(argument)) {
                path.replaceWithMultiple(argument.properties);
              }
            },
          },
        },
      }),
    ],
    parserOpts: {
      plugins: ["typescript", "decorators", "decoratorAutoAccessors"],
    },
    generatorOpts: {
      shouldPrintComment: (comment: string) =>
        !comment.includes("@ts-ignore(Babel 7 vs Babel 8)"),
    },
  })
);

gulp.task("materialize-babel-8-tests", () =>
  applyBabelToGlob(
    new Glob(`${defaultPackagesGlob}/test/**/{*.js,*.cjs,*.mjs}`, {
      ignore: [
        `**/test/fixtures/**`,
        `**/test/regenerator-fixtures/**`,
        `**/test/tmp/**`,
        `**/test/node_modules/**`,
        `**/babel-parser/test/expressions/**`,
      ],
    }),
    {
      plugins: [
        ({ types: t }: typeof import("@babel/core")) => ({
          visitor: {
            CallExpression(path: NodePath<types.CallExpression>) {
              if (path.node.arguments.length < 2) return;
              if (!path.parentPath.isExpressionStatement()) return;

              let callee = path.get("callee");
              while (callee.isMemberExpression() || callee.isCallExpression()) {
                if (callee.isCallExpression()) {
                  callee = callee.get("callee");
                } else {
                  callee = callee.get("object");
                }
              }
              if (!callee.isIdentifier()) return;
              switch (callee.node.name) {
                case "itNoESM":
                case "itGteNoESM":
                case "itBabel7":
                case "itBabel7NoESM":
                case "itBabel7GteNoESM":
                case "describeBabel7":
                case "describeBabel7NoESM":
                  path.remove();
                  break;

                case "itESM":
                case "itBabel8":
                  callee.replaceWith(t.identifier("it"));
                  break;

                case "describeESM":
                case "describeBabel8":
                  callee.replaceWith(t.identifier("describe"));
                  break;
              }
            },
            Program: {
              exit(path: NodePath<types.Program>) {
                path.scope.crawl();

                for (const decl of path.get("body")) {
                  if (!decl.isImportDeclaration()) continue;
                  if (decl.node.source.value !== "$repo-utils") continue;

                  for (const spec of decl.get("specifiers")) {
                    if (
                      !path.scope.getBinding(spec.node.local.name)?.referenced
                    ) {
                      spec.remove();
                    }
                  }
                  if (decl.node.specifiers.length === 0) {
                    decl.remove();
                  }
                }
              },
            },
          },
        }),
      ],
    }
  )
);

gulp.task("build-rollup", () => buildRollup(libBundles));
gulp.task("rollup-babel-standalone", () => buildRollup(standaloneBundle, true));
gulp.task(
  "build-babel-standalone",
  gulp.series("generate-standalone", "rollup-babel-standalone")
);

gulp.task("bundle-dts", () => buildRollupDts(dtsBundles));

gulp.task("build-babel", () => buildBabel(true, /* exclude */ libBundles));

gulp.task(
  "build",
  gulp.series(
    gulp.parallel("build-rollup", "build-babel"),
    gulp.parallel(
      "generate-type-helpers",
      "generate-runtime-helpers",
      "generate-helper-globals-data"
    ),
    // rebuild @babel/types and @babel/helpers since
    // type-helpers and generated helpers may be changed
    gulp.parallel("build-rollup", "build-babel"),
    "generate-standalone"
  )
);

gulp.task("default", gulp.series("build"));

// First build on worker processes for compilation speed
gulp.task("build-no-bundle", () => buildBabel(true));
// Incremental builds take place in main process
gulp.task("build-no-bundle-watch", () => buildBabel(false));

gulp.task(
  "build-dev",
  gulp.series(
    "build-no-bundle",
    gulp.parallel(
      "generate-standalone",
      "generate-runtime-helpers",
      "generate-helper-globals-data",
      gulp.series(
        "generate-type-helpers",
        // rebuild @babel/types since type-helpers may be changed
        "build-no-bundle"
      )
    )
  )
);

function watch() {
  gulp.watch(defaultSourcesGlob, gulp.task("build-no-bundle-watch"));
  gulp.watch(babelStandalonePluginConfigGlob, gulp.task("generate-standalone"));
  gulp.watch(buildTypingsWatchGlob, gulp.task("generate-type-helpers"));
  gulp.watch(
    ["./packages/babel-helpers/src/helpers/*"],
    gulp.task("generate-runtime-helpers")
  );
}

gulp.task(
  "watch",
  process.env.WATCH_SKIP_BUILD ? watch : gulp.series("build-dev", watch)
);
