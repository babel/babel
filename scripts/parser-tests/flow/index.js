// @ts-check

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import merge from "mergeiterator";
import TestRunner from "../utils/parser-test-runner.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));

function convertFlowParserTestOptionsToBabelParserOptions(testOptions = {}) {
  const flowOptions = { all: true };

  const options = {
    plugins: [["flow", flowOptions], "flowComments", "jsx"],
  };

  for (const [option, enabled] of Object.entries(testOptions)) {
    // https://github.com/facebook/flow/blob/8c1ea0b9e5eb69a8f0a6059ec15caad54ad77ba4/src/parser/test/run_tests.ml#L123
    switch (option) {
      case "components":
        // we don't support this syntax
        continue;
      case "assert_operator":
        // we don't support this syntax
        continue;
      case "enums":
        flowOptions.enums = true;
        continue;
      case "pattern_matching":
        // we don't support this syntax
        continue;
      case "records":
        // we don't support this syntax
        continue;
      case "esproposal_decorators":
        options.plugins.push("decorators-legacy");
        continue;
      case "types":
        if (enabled === false) {
          options.plugins = [];
        }
        continue;
      case "use_strict":
        options.strictMode = enabled;
        continue;
      case "intern_comments":
        // we don't support this syntax
        continue;
      default:
        throw new Error("Unknown flow parser test option: " + option);
    }
  }

  return options;
}

async function* readdirRecursive(root, dir = ".") {
  const names = await fs.readdir(path.join(root, dir));

  const dirs = [];

  for (const name of names) {
    const file = path.join(dir, name);
    const stats = await fs.stat(path.join(root, file));
    if (!stats.isDirectory()) {
      if (!file) continue;
      yield file;
    } else {
      dirs.push(readdirRecursive(root, file));
    }
  }

  yield* merge(dirs);
}

async function* loadTests(root) {
  for await (const file of readdirRecursive(root)) {
    if (file.slice(-3) === ".js") {
      const noExt = path.join(root, file).slice(0, -3);

      const [contents, tree, options] = await Promise.all([
        fs.readFile(noExt + ".js", "utf8"),
        fs.readFile(noExt + ".tree.json", "utf8").catch(() => "{}"),
        fs.readFile(noExt + ".options.json", "utf8").catch(() => "{}"),
      ]);

      yield {
        file,
        contents,
        tree: JSON.parse(tree),
        options: JSON.parse(options),
      };
    }
  }
}

const runner = new TestRunner({
  testDir: path.join(dirname, "../../../build/flow/src/parser/test/flow"),
  allowlist: path.join(dirname, "allowlist.md"),
  shouldUpdate: process.argv.includes("--update-allowlist"),

  async *getTests() {
    for await (const test of loadTests(this.testDir)) {
      const shouldSuccess =
        test.tree && (!test.tree.errors || !test.tree.errors.length);

      yield {
        contents: test.contents,
        fileName: test.file,
        id: test.file,
        expectedError: !shouldSuccess,
        options: convertFlowParserTestOptionsToBabelParserOptions(test.options),
      };
    }
  },

  parse(test, parser) {
    try {
      parser(test.contents, {
        sourceType: "module",
        ...test.options,
      });
    } catch (e) {
      // let's retry in script mode
      if (!test.expectedError) {
        try {
          parser(test.contents, {
            sourceType: "script",
            ...test.options,
          });
          return;
        } catch {}
      }

      throw e;
    }
  },
});

runner.run().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
