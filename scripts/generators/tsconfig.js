"use strict";

const path = require("path");
const fs = require("fs");

const root = path.resolve(__dirname, "../../");

const tsPkgs = fs
  .readdirSync(path.join(root, "packages"))
  .filter(name => name.startsWith("babel-"))
  .map(name => ({
    name: name.replace(/^babel-/, "@babel/"),
    dir: path.resolve(root, "packages", name),
  }))
  .filter(({ dir }) => {
    try {
      fs.statSync(path.join(dir, "src", "index.ts"));
      return true;
    } catch {
      return false;
    }
  });

for (const { dir } of tsPkgs) {
  const pkg = require(`${dir}/package.json`);

  const references = [];
  for (const dep of Object.keys(pkg.dependencies)) {
    if (!dep.startsWith("@babel/")) continue;
    for (const { name, dir: depDir } of tsPkgs) {
      if (name === dep) {
        references.push({ path: path.relative(dir, depDir) });
        break;
      }
    }
  }

  fs.writeFileSync(
    path.resolve(dir, "tsconfig.json"),
    JSON.stringify(
      {
        extends: "../../tsconfig.base.json",
        compilerOptions: {
          // Until we have converted every package, we cannot store
          // .d.ts files inside lib/ because it causes conflicts
          // with Babel-related type definitions in node_modules/@types
          outDir: "./dts",
          rootDir: "./src",
        },
        include: ["./src/**/*"],
        references,
      },
      null,
      2
    )
  );
}

fs.writeFileSync(
  path.resolve(root, `tsconfig.json`),
  JSON.stringify(
    {
      files: [],
      references: tsPkgs.map(({ dir }) => ({
        path: path.relative(root, dir),
      })),
    },
    null,
    2
  )
);
