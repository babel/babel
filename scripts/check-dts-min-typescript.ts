/**
 * Type-checks the bundled .d.ts files of the published packages with the
 * oldest TypeScript version allowed by `engines.typescript` in the root
 * package.json, together with the typings of their dependencies.
 *
 * Run `make tscheck && yarn gulp bundle-dts` first (on CI, `make lint-ci`
 * already does).
 */
import { execFileSync } from "node:child_process";
import {
  existsSync,
  globSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const { engines } = JSON.parse(readFileSync("package.json", "utf8"));
const range: unknown = engines?.typescript;
if (typeof range !== "string") {
  throw new Error(`"engines.typescript" is missing in package.json`);
}

// This script uses npm rather than Yarn:
// - `yarn npm info` resolves a range to its highest version only, while
//   `npm view` lists every matching version.
// - Installing the old TypeScript with Yarn inside the repo would modify the
//   root package.json and yarn.lock. Outside the repo, `yarn` is no longer the
//   version pinned in "packageManager" but whatever is installed globally
//   (often Yarn 1). npm ships with Node.js and behaves the same everywhere.

// The lowest stable TypeScript release in the range. E.g. ">=5.0" gives
// 5.0.2, since TypeScript 5.0.0 and 5.0.1 were only published as pre-releases.
const versions: string | string[] = JSON.parse(
  execFileSync("npm", ["view", `typescript@${range}`, "version", "--json"], {
    encoding: "utf8",
  })
);
const [minVersion] = [versions]
  .flat()
  .filter(version => !version.includes("-"))
  .sort((a, b) => {
    const [a1, a2, a3] = a.split(".").map(Number);
    const [b1, b2, b3] = b.split(".").map(Number);
    return a1 - b1 || a2 - b2 || a3 - b3;
  });
if (!minVersion) {
  throw new Error(`No stable TypeScript release matches "${range}"`);
}

const exclude = new Set([
  // Its types are in types.d.ts, not lib/. The package is CommonJS, so with
  // "moduleResolution": "node16" its imports of the ESM-only @babel/* packages
  // fail in every TypeScript version.
  "packages/babel-standalone",
  // Babel's test infrastructure: their types use Node.js globals and node:vm
  // without depending on @types/node.
  "packages/babel-helper-fixtures",
  "packages/babel-helper-transform-fixture-test-runner",
]);

const files = globSync("{packages,eslint,codemods}/*/package.json")
  .map(pkgJSON => path.dirname(pkgJSON))
  .filter(dir => {
    const { private: isPrivate } = JSON.parse(
      readFileSync(path.join(dir, "package.json"), "utf8")
    );
    return !isPrivate && !exclude.has(dir);
  })
  .flatMap(dir => globSync(`${dir}/lib/*.d.ts`))
  .map(file => path.resolve(file));

if (!existsSync("packages/babel-core/lib/index.d.ts")) {
  throw new Error(
    "Bundled .d.ts files not found, run `make tscheck && yarn gulp bundle-dts` first"
  );
}

const tmp = mkdtempSync(path.join(tmpdir(), "babel-dts-min-typescript-"));
try {
  execFileSync(
    "npm",
    [
      "install",
      "--prefix",
      tmp,
      "--no-save",
      "--no-package-lock",
      "--no-audit",
      "--no-fund",
      `typescript@${minVersion}`,
    ],
    { stdio: "inherit" }
  );

  writeFileSync(
    path.join(tmp, "tsconfig.json"),
    JSON.stringify(
      {
        compilerOptions: {
          noEmit: true,
          strict: true,
          skipLibCheck: false,
          target: "ESNext",
          lib: ["ESNext"],
          module: "Node16",
          moduleResolution: "Node16",
          // Only load the typings that the published packages import.
          types: [],
          // Same as tsconfig.dts-bundles.json: node_modules/@babel/core is the
          // published version that builds Babel.
          paths: {
            "@babel/core": [path.resolve("packages/babel-core/lib/index.d.ts")],
          },
        },
        files,
      },
      null,
      2
    )
  );

  const tsc = path.join(tmp, "node_modules/typescript/bin/tsc");
  console.log(
    `Checking ${files.length} .d.ts files with TypeScript ${execFileSync(
      "node",
      [tsc, "--version"],
      { encoding: "utf8" }
    ).trim()} ("engines.typescript": "${range}")`
  );
  execFileSync("node", [tsc, "-p", path.join(tmp, "tsconfig.json")], {
    stdio: "inherit",
  });
} catch (error) {
  // tsc already printed its diagnostics
  if ((error as { status?: number }).status == null) throw error;
  process.exitCode = 1;
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
