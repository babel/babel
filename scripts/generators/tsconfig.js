import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../"
);

function getTsPkgs(subRoot) {
  return fs
    .readdirSync(path.join(root, subRoot))
    .filter(name => name.startsWith("babel-"))
    .map(name => ({
      name: name.replace(/^babel-/, "@babel/"),
      dir: path.resolve(root, subRoot, name),
      relative: `./${subRoot}/${name}`,
    }))
    .filter(
      ({ dir }) =>
        // babel-register is special-cased because its entry point is a js file
        dir.includes("babel-register") ||
        fs.existsSync(path.join(dir, "src", "index.ts"))
    );
}

const tsPkgs = [
  ...getTsPkgs("packages"),
  ...getTsPkgs("eslint"),
  ...getTsPkgs("codemods"),
];

// https://github.com/babel/babel-archive
const archivedSyntaxPkgs = [
  "@babel/plugin-syntax-async-functions",
  "@babel/plugin-syntax-async-generators",
  "@babel/plugin-syntax-bigint",
  "@babel/plugin-syntax-class-properties",
  "@babel/plugin-syntax-class-static-block",
  "@babel/plugin-syntax-dynamic-import",
  "@babel/plugin-syntax-exponentiation-operator",
  "@babel/plugin-syntax-export-extensions",
  "@babel/plugin-syntax-export-namespace-from",
  "@babel/plugin-syntax-import-meta",
  "@babel/plugin-syntax-json-strings",
  "@babel/plugin-syntax-logical-assignment-operators",
  "@babel/plugin-syntax-module-string-names",
  "@babel/plugin-syntax-nullish-coalescing-operator",
  "@babel/plugin-syntax-numeric-separator",
  "@babel/plugin-syntax-object-rest-spread",
  "@babel/plugin-syntax-optional-catch-binding",
  "@babel/plugin-syntax-optional-chaining",
  "@babel/plugin-syntax-private-property-in-object",
  "@babel/plugin-syntax-top-level-await",
  "@babel/plugin-syntax-trailing-function-commas",
];

fs.writeFileSync(
  path.resolve(root, `tsconfig.json`),
  "/* This file is automatically generated by scripts/generators/tsconfig.js */\n" +
    JSON.stringify(
      {
        extends: "./tsconfig.base.json",
        include: tsPkgs.map(({ relative }) => `${relative}/src/**/*.ts`),
        compilerOptions: {
          paths: Object.fromEntries([
            ...tsPkgs.map(({ name, relative }) => [name, [`${relative}/src`]]),
            ...archivedSyntaxPkgs.map(name => [
              name,
              ["./lib/archived-libs.d.ts"],
            ]),
          ]),
        },
      },
      null,
      2
    )
);
