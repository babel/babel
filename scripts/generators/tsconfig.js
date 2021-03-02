import path from "path";
import fs from "fs";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import globby from "globby";

const require = createRequire(import.meta.url);

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
    }))
    .filter(({ dir }) => {
      try {
        fs.statSync(path.join(dir, "src", "index.ts"));
        return true;
      } catch {
        return false;
      }
    });
}

const tsPkgs = [
  ...getTsPkgs("packages"),
  ...getTsPkgs("eslint"),
  ...getTsPkgs("codemods"),
];

function sourceDeps(packageDir) {
  const files = globby.sync(`src/**/*.ts`, {
    cwd: packageDir,
    onlyFiles: true,
    dot: true,
    ignore: ["**/node_modules/**"],
  });
  const result = new Set();
  for (const file of files) {
    const filename = path.join(packageDir, file);
    const source = fs.readFileSync(filename, { encoding: "utf8" });

    for (const [importSource] of source.matchAll(
      /(?<=from\s*")@babel\/[^"/]+/g
    )) {
      result.add(importSource);
    }
  }
  return result;
}

for (const { dir } of tsPkgs) {
  const pkg = require(`${dir}/package.json`);

  try {
    const tsconfig = require(`${dir}/tsconfig.json`);
    // Don't overwrite manually written configs
    if (!tsconfig.generated) continue;
  } catch {}

  const deps = new Set([
    ...(pkg.dependencies ? Object.keys(pkg.dependencies) : []),
    ...(pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : []),
    // todo(flow->ts): update dependencies in package.json if dependency declared incorrectly
    ...sourceDeps(dir),
  ]);

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
