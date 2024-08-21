import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import merge from "mergeiterator";
import TestRunner from "../utils/parser-test-runner.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const flowOptionsMapping = {
  esproposal_decorators: "decorators-legacy",
  types: "flowComments",
  intern_comments: false,
};

function getPlugins(test) {
  const flowOptions = { all: true };

  const plugins = [["flow", flowOptions], "flowComments", "jsx"];

  if (!test.options) return plugins;

  for (const [option, enabled] of Object.entries(test.options)) {
    if (!enabled) {
      const idx = plugins.indexOf(flowOptionsMapping[option]);
      if (idx !== -1) plugins.splice(idx, 1);
    } else if (option === "enums") {
      flowOptions.enums = true;
    } else if (!(option in flowOptionsMapping)) {
      throw new Error("Parser options not mapped " + option);
    } else if (flowOptionsMapping[option]) {
      plugins.push(flowOptionsMapping[option]);
    }
  }

  return plugins;
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
        fs.readFile(noExt + ".tree.json", "utf8").catch(() => null),
        fs.readFile(noExt + ".options.json", "utf8").catch(() => null),
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
  allowlist: path.join(dirname, "allowlist.txt"),
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
        plugins: getPlugins(test),
      };
    }
  },

  parse(test, parser) {
    try {
      parser(test.contents, {
        sourceType: "module",
        plugins: test.plugins,
      });
    } catch (e) {
      // lets retry in script mode
      if (!test.expectedError) {
        try {
          parser(test.contents, {
            sourceType: "script",
            plugins: test.plugins,
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
