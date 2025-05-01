import Benchmark from "benchmark";
import { report } from "../../util.mjs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { readFileSync, writeFileSync } from "node:fs";

const suite = new Benchmark.Suite();

// Modify `@babel/cli`'s package.json such that we can run ./bin/babel.js directly from the monorepo
function changeBabelCliModuleType() {
  const packageJSONPath = fileURLToPath(
    import.meta.resolve("@babel/cli/package.json")
  );
  const content = readFileSync(packageJSONPath, "utf-8");
  const patchedContent = content.replace(
    `"type": "module"`,
    `"type": "commonjs"`
  );
  writeFileSync(packageJSONPath, patchedContent);
  return () => writeFileSync(packageJSONPath, content);
}

const revert = changeBabelCliModuleType();
function benchCases(
  name,
  implementationPackageJSONSpecifier,
  binaryRelativePath
) {
  const binaryPath = fileURLToPath(
    new URL(
      binaryRelativePath,
      import.meta.resolve(implementationPackageJSONSpecifier)
    )
  );
  suite.add(
    `${name}`,
    () => {
      execFileSync(binaryPath, ["--help"]);
    },
    {
      minSamples: 1,
    }
  );
}

benchCases("baseline", "@babel-baseline/cli/package.json", "./bin/babel.js");
benchCases("current", "@babel/cli/package.json", "./bin/babel.js");
benchCases("current-esm", "@babel/cli/package.json", "./bin/babel.mjs");

suite.on("cycle", report).run();

revert();
