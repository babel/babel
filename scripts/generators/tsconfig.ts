import fs from "node:fs";
import archivedSyntaxPkgs from "./archived-syntax-pkgs.json" with { type: "json" };

function importJSON(path: URL) {
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

function maybeWriteFile(url: URL, contents: string) {
  try {
    if (fs.readFileSync(url, "utf8") === contents) return;
  } catch {}
  fs.writeFileSync(url, contents);
}

const thirdPartyBabelPlugins = [
  "@babel/preset-modules/lib/plugins/transform-async-arrows-in-class",
  "@babel/preset-modules/lib/plugins/transform-edge-default-parameters",
  "@babel/preset-modules/lib/plugins/transform-edge-function-name",
  "@babel/preset-modules/lib/plugins/transform-tagged-template-caching",
  "@babel/preset-modules/lib/plugins/transform-safari-block-shadowing",
  "@babel/preset-modules/lib/plugins/transform-safari-for-shadowing",
  "babel-plugin-polyfill-corejs2",
  "babel-plugin-polyfill-corejs3",
  "babel-plugin-polyfill-regenerator",
  "regenerator-transform",
];

const rootURL = new URL("../../", import.meta.url);

// used in /lib/third-party.d.ts
const dependencyAliases = new Map([
  ["babel-plugin-polyfill-corejs2", "@babel/helper-plugin-utils"],
  ["babel-plugin-polyfill-corejs3", "@babel/helper-plugin-utils"],
  ["babel-plugin-polyfill-regenerator", "@babel/helper-plugin-utils"],
  ["@babel/preset-modules", "@babel/helper-plugin-utils"],
  ["regenerator-transform", "@babel/helper-plugin-utils"],
]);

/**
 * Get the TypeScript typing dependencies for a package
 */
const packageTypingDependencies = (
  pkgName: string,
  pkgJSON: {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
    peerDependenciesMeta?: Record<string, { optional: boolean }>;
  }
) => {
  const dependencies = new Set([
    ...Object.keys(pkgJSON.dependencies ?? {}),
    ...Object.keys(pkgJSON.peerDependencies ?? {}).filter(
      dep => pkgJSON.peerDependenciesMeta?.[dep].optional !== true
    ),
  ]);
  switch (pkgName) {
    case "@babel/helpers":
      dependencies.add("@babel/traverse");
      break;
    case "@babel/standalone":
      Object.keys(pkgJSON.devDependencies ?? {}).forEach(dep =>
        dependencies.add(dep)
      );
      break;
    case "@babel/plugin-transform-runtime":
      dependencies.add("@babel/preset-env");
      break;
    default:
      break;
  }
  return dependencies;
};

type TsPackageInfo = {
  name: string;
  relative: string;
  subExports: [string, string][];
  dependencies: Set<string>;
  dfsOutIndex: number;
};

/**
 * Get TypeScript packages meta info in a subdirectory
 */
function getTsPkgs(subRoot: string): [string, TsPackageInfo][] {
  return fs
    .readdirSync(new URL(subRoot, rootURL))
    .filter(name => name.startsWith("babel-"))
    .map(name => ({
      name: name.replace(/^babel-/, "@babel/"),
      relative: `./${subRoot}/${name}`,
    }))
    .filter(({ name, relative }) => {
      const ret =
        // They are special-cased because them dose not have a index.ts
        name === "@babel/register" ||
        name === "@babel/cli" ||
        name === "@babel/build-external-helpers" ||
        name === "@babel/node" ||
        name === "@babel/eslint-parser" ||
        // @babel/compat-data is used by preset-env
        name === "@babel/compat-data" ||
        fs.existsSync(new URL(relative + "/src/index.ts", rootURL));
      if (!ret) {
        // console.log(`Skipping ${name} for tsconfig.json`);
      }
      return ret;
    })
    .map(({ name, relative }) => {
      const packageJSON = importJSON(
        new URL(relative + "/package.json", rootURL)
      );
      try {
        fs.rmSync(new URL(relative + "/tsconfig.json", rootURL));
      } catch {}
      // Babel 9 exports > Babel 8 exports > {}
      const exports: Record<string, any> =
        packageJSON.conditions?.BABEL_9_BREAKING?.[0]?.exports ??
        packageJSON.exports ??
        {};
      /**
       * @description The sub-exports of the package, where the key is the export name
       * and the value is the path to the export, relative to the package root.
       */
      const subExports = Object.entries(exports).flatMap(
        ([_export, exportPath]): [string, string][] => {
          // The @babel/standalone has babel.js as exports, but we don't have src/babel.ts
          if (name === "@babel/standalone") {
            return [["", "/src"]];
          }
          if (
            name === "@babel/compat-data" ||
            name === "@babel/helper-globals"
          ) {
            return [[_export.slice(1), exportPath.slice(1)]];
          }
          // [{esm, default}, "./lib/index.js"]
          if (Array.isArray(exportPath)) {
            exportPath = exportPath[1];
          }
          if (typeof exportPath === "object") {
            exportPath = exportPath.default;
          }
          if (
            exportPath.startsWith("./lib") &&
            (exportPath.endsWith(".js") || exportPath.endsWith(".cjs"))
          ) {
            // remove the leading `.` and trailing `.js`
            const subExport = _export.slice(1).replace(/\.c?js$/, "");
            /**
             * @type {string}
             * @description The path to the sub-export, relative to the package root.
             */
            const subExportPath = exportPath
              .replace("./lib", "/src")
              .replace(/\.js$/, ".ts")
              .replace(/\.cjs$/, ".cts")
              .replace(/\/index\.c?ts$/, "");
            return [[subExport, subExportPath]];
          }
          return [];
        }
      );
      const dependencies = packageTypingDependencies(name, packageJSON);
      dependencyAliases.forEach((alias, dep) => {
        if (dependencies.has(dep)) dependencies.add(alias);
      });
      return [
        name,
        {
          name,
          relative,
          subExports,
          dependencies,
          dfsOutIndex: -1,
        },
      ];
    });
}

const tsPkgs = new Map([
  ...getTsPkgs("packages"),
  ...getTsPkgs("eslint"),
  ...getTsPkgs("codemods"),
]);

const roots = new Set(tsPkgs.keys());

tsPkgs.forEach(({ dependencies }) => {
  dependencies.forEach(dep => {
    if (!tsPkgs.has(dep)) dependencies.delete(dep);
    roots.delete(dep);
  });
});

const seen = new Set();
const stack: string[] = [];
let index = 0;
for (const name of roots) {
  /**
   * Depth-first search
   */
  (function dfs(node: TsPackageInfo) {
    if (seen.has(node)) {
      if (stack.includes(node.name)) {
        let cycleNames = node.name;
        for (let i = stack.length - 1; i >= 0 && stack[i] !== node.name; i--) {
          cycleNames = stack[i] + " > " + cycleNames;
        }
        cycleNames = node.name + " > " + cycleNames;
        throw new Error("Cycle detected: " + cycleNames);
      }
      return;
    }
    seen.add(node);
    stack.push(node.name);
    for (const dep of node.dependencies) {
      dfs(tsPkgs.get(dep)!);
    }
    stack.pop();
    node.dfsOutIndex = index++;
  })(tsPkgs.get(name)!);
}

const topoSorted = Array.from(tsPkgs.values()).sort((a, b) => {
  return a.dfsOutIndex - b.dfsOutIndex;
});

const projectsFolders = new Map();

for (const pkg of topoSorted) {
  projectsFolders.set(pkg.name, pkg.relative);

  const tsConfig = buildTSConfig(
    pkg,
    fs.existsSync(new URL(pkg.relative + "/tsconfig.overrides.json", rootURL)),
    fs.existsSync(new URL(pkg.relative + "/scripts", rootURL))
  );

  maybeWriteFile(
    new URL(pkg.relative + "/tsconfig.json", rootURL),
    "/* This file is automatically generated by scripts/generators/tsconfig.ts */\n" +
      JSON.stringify(tsConfig, null, 2)
  );
}

function buildTSConfig(
  pkg: TsPackageInfo,
  hasOverrides: boolean,
  hasScripts: boolean
) {
  const paths: Record<string, string[]> = {};
  const referencePaths = new Set();

  for (const name of pkg.dependencies) {
    // @ts-expect-error name must be a key in tsPkgs
    const { relative, subExports } = tsPkgs.get(name);
    for (const [subExport, subExportPath] of subExports) {
      paths[name + subExport] = ["../../" + relative.slice(2) + subExportPath];
    }
    referencePaths.add("../../" + projectsFolders.get(name).slice(2));
  }

  return {
    extends: [
      "../../tsconfig.base.json",
      "../../tsconfig.paths.json",
      hasOverrides && "./tsconfig.overrides.json",
    ].filter(Boolean),
    include: [
      "./src/**/*.ts",
      "./src/**/*.cts",
      pkg.name === "@babel/register" && "./src/**/*.mts",
      pkg.name === "@babel/standalone" && "./types.d.ts",
      hasScripts && "./scripts/**/*.ts",
      "../../lib/globals.d.ts",
      "../../scripts/repo-utils/*.d.ts",
    ].filter(Boolean),
    references: Array.from(referencePaths, path => ({ path })),
  };
}

maybeWriteFile(
  new URL("tsconfig.paths.json", rootURL),
  "/* This file is automatically generated by scripts/generators/tsconfig.ts */\n" +
    JSON.stringify(
      {
        compilerOptions: {
          paths: Object.fromEntries([
            ...Array.from(tsPkgs.values()).flatMap(
              ({ name, relative, subExports }) => {
                return subExports.map(([subExport, subExportPath]) => {
                  return [name + subExport, [relative + subExportPath]];
                });
              }
            ),
            ...archivedSyntaxPkgs.map(name => [
              name,
              ["./lib/archived-libs.d.ts"],
            ]),
            ...thirdPartyBabelPlugins.map(name => [
              name,
              ["./lib/third-party-libs.d.ts"],
            ]),
            [
              "babel-plugin-dynamic-import-node/utils",
              ["./lib/babel-plugin-dynamic-import-node.d.ts"],
            ],
            ["kexec", ["./lib/kexec.d.ts"]],
          ]),
        },
      },
      null,
      2
    )
);

maybeWriteFile(
  new URL("tsconfig.json", rootURL),
  "/* This file is automatically generated by scripts/generators/tsconfig.ts */\n" +
    JSON.stringify(
      {
        extends: ["./tsconfig.base.json", "./tsconfig.paths.json"],
        compilerOptions: {
          strict: true,
        },
        include: [
          "lib/libdom-minimal.d.ts",
          "dts/codemods/*/src/**/*.ts",
          "dts/eslint/*/src/**/*.ts",
          "dts/packages/*/src/**/*.ts",
          "*.mts",
          "*.ts",
          "scripts/**/*.ts",
          "codemods/*/test/*.tst.ts",
          "eslint/*/test/*.tst.ts",
          "packages/*/test/*.tst.ts",
        ],
        exclude: [],
        references: Array.from(new Set(projectsFolders.values()))
          .sort()
          .map(path => ({ path })),
      },
      null,
      2
    )
);
