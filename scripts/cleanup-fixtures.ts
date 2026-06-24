import { repoRoot } from "$repo-utils";
import {
  existsSync,
  globSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

const hasCategories = ["babel-parser"];

const fixtures = globSync("./@(codemods|packages|eslint)/*/test/fixtures/", {
  cwd: repoRoot,
})
  .map(fixture => {
    if (
      hasCategories.some(name =>
        fixture.replace(/\\/g, "/").includes(`packages/${name}/`)
      )
    ) {
      return globSync("*/", {
        cwd: fixture,
      });
    }
    return fixture;
  })
  .flat()
  .map(fixture => path.join(repoRoot, fixture));

for (const fixture of fixtures) {
  const optionsPath = path.join(fixture, "options.json");

  const fixtureOptions = existsSync(optionsPath)
    ? JSON.parse(readFileSync(optionsPath, "utf-8"))
    : null;

  const suites = globSync("*/", {
    cwd: fixture,
  }).map(suite => path.join(fixture, suite));

  for (const suite of suites) {
    const optionsPath = path.join(suite, "options.json");

    const suiteOptions = existsSync(optionsPath)
      ? JSON.parse(readFileSync(optionsPath, "utf-8"))
      : fixtureOptions;

    if (suiteOptions) {
      const tests = globSync("*/", {
        cwd: suite,
      }).map(test => path.join(suite, test));

      for (const test of tests) {
        const optionsPath = path.join(test, "options.json");

        if (existsSync(optionsPath)) {
          const testOptions = JSON.parse(readFileSync(optionsPath, "utf-8"));

          if (JSON.stringify(testOptions) === JSON.stringify(suiteOptions)) {
            rmSync(optionsPath);
            console.log(`Removed duplicated options.json file: ${test}`);
            continue;
          }

          if (testOptions.throws) {
            const throws = testOptions.throws;
            delete testOptions.throws;
            if (JSON.stringify(testOptions) === JSON.stringify(suiteOptions)) {
              writeFileSync(optionsPath, JSON.stringify({ throws }, null, 2));
              console.log(`Removed duplicated options: ${test}`);
              continue;
            }
          }
        }
      }
    }
  }
}
