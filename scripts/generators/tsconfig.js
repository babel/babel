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

  try {
    const tsconfig = require(`${dir}/tsconfig.json`);
    // Don't overwrite manually written configs
    if (!tsconfig.generated) continue;
  } catch {}

  const deps = [];
  if (pkg.dependencies) deps.push(...Object.keys(pkg.dependencies));
  if (pkg.peerDependencies) deps.push(...Object.keys(pkg.peerDependencies));

  const references = [];
  for (const dep of deps) {
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
        generated: true,
        extends: "../../tsconfig.base.json",
        compilerOptions: {
          outDir: "./lib",
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
