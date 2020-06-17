const fs = require("fs").promises;
const path = require("path");
const merge = require("mergeiterator");
const TestRunner = require("../utils/parser-test-runner");

const flowOptionsMapping = {
  esproposal_class_instance_fields: "classProperties",
  esproposal_class_static_fields: "classProperties",
  esproposal_export_star_as: "exportNamespaceFrom",
  esproposal_decorators: "decorators-legacy",
  esproposal_nullish_coalescing: "nullishCoalescingOperator",
  esproposal_optional_chaining: "optionalChaining",
  types: "flowComments",
  intern_comments: false,
};

function getPlugins(test) {
  const flowOptions = { all: true };

  const plugins = [
    "dynamicImport",
    ["flow", flowOptions],
    "flowComments",
    "jsx",
    "classProperties",
    "classPrivateProperties",
    "classPrivateMethods",
    "bigInt",
    "numericSeparator",
  ];

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
  testDir: path.join(__dirname, "../../../build/flow/src/parser/test/flow"),
  allowlist: path.join(__dirname, "allowlist.txt"),
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
