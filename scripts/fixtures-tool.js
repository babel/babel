import { glob } from "glob";
import { repoRoot } from "$repo-utils";
import { existsSync, readFileSync, rmSync, writeFileSync } from "fs";
import path from "path";

const hasCategories = ["babel-parser"];

const fixtures = glob
  .sync("./@(codemods|packages|eslint)/*/test/fixtures/", {
    cwd: repoRoot,
    absolute: true,
  })
  .map(fixture => {
    if (
      hasCategories.some(name =>
        fixture.replace(/\\/g, "/").includes(`packages/${name}/`)
      )
    ) {
      return glob.sync("*/", {
        cwd: fixture,
        absolute: true,
      });
    }
    return fixture;
  })
  .flat();

for (const fixture of fixtures) {
  const optionsPath = path.join(fixture, "options.json");

  const fixtureOptions = existsSync(optionsPath)
    ? JSON.parse(readFileSync(optionsPath, "utf-8"))
    : null;

  const suites = glob.sync("*/", {
    cwd: fixture,
    absolute: true,
  });

  for (const suite of suites) {
    const optionsPath = path.join(suite, "options.json");

    const suiteOptions = existsSync(optionsPath)
      ? JSON.parse(readFileSync(optionsPath, "utf-8"))
      : fixtureOptions;

    if (suiteOptions) {
      const tests = glob.sync("*/", {
        cwd: suite,
        absolute: true,
      });

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
