"use strict";

const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const parse = require("../../../packages/babel-parser").parse;

const TESTS_FOLDER = path.join(
  __dirname,
  "../../../build/flow/src/parser/test/flow"
);
const WHITELIST_PATH = path.join(__dirname, "./flow_tests_whitelist.txt");

const shouldUpdateWhitelist = process.argv.indexOf("--update-whitelist") > 0;

function map_get_default(map, key, defaultConstructor) {
  if (map.has(key)) {
    return map.get(key);
  }
  const value = new defaultConstructor();
  map.set(key, value);
  return value;
}

function get_whitelist(filename) {
  return fs
    .readFileSync(filename, "utf8")
    .split("\n")
    .map(line => line.replace(/#.*$/, "").trim())
    .filter(Boolean);
}

function list_files(root, dir) {
  const files = fs.readdirSync(dir ? path.join(root, dir) : root);
  let result = [];
  for (let i = 0; i < files.length; i++) {
    const file = dir ? path.join(dir, files[i]) : files[i];
    const stats = fs.statSync(path.join(root, file));
    if (stats.isDirectory()) {
      result = result.concat(list_files(root, file));
    } else {
      result.push(file);
    }
  }
  return result.sort();
}

function get_tests(root_dir) {
  const files = list_files(root_dir);
  const tests = new Map();
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const test_name = path.dirname(file);
    const case_parts = path.basename(file).split(".");
    const case_name = case_parts[0];

    // Hack to ignore hidden files.
    if (case_name === "") {
      continue;
    }

    const cases = map_get_default(tests, test_name, Map);
    const case_ = map_get_default(cases, case_name, Object);

    const content = fs.readFileSync(path.join(root_dir, file), "utf8");
    const ext = case_parts[case_parts.length - 1];
    const kind =
      case_parts.length > 2 ? case_parts[case_parts.length - 2] : null;

    if (ext === "js") {
      case_.file = file;
      case_.content = content;
    } else if (ext === "json" && kind === "tree") {
      case_.expected_ast = JSON.parse(content);
    } else if (ext === "json" && kind === "options") {
      case_.options = JSON.parse(content);
    }
  }
  return tests;
}

function update_whitelist(summary) {
  const contains = (tests, file) =>
    tests.some(({ test }) => test.file === file);

  const disallowed = summary.disallowed.success.concat(
    summary.disallowed.failure
  );

  const oldLines = fs
    .readFileSync(WHITELIST_PATH, "utf8")
    .trim()
    .split("\n")
    .filter(line => {
      const file = line.replace(/#.*$/, "").trim();
      return (
        !contains(disallowed, file) && summary.unrecognized.indexOf(file) === -1
      );
    });

  const newLines = disallowed
    .map(({ test }) => test.file)
    .filter(test => oldLines.indexOf(test) === -1);

  const result = oldLines.concat(newLines).join("\n") + "\n";

  fs.writeFileSync(WHITELIST_PATH, result);
}

const options = {
  plugins: [
    "dynamicImport",
    ["flow", { all: true }],
    "flowComments",
    "jsx",
    "classPrivateProperties",
  ],
  sourceType: "module",
  ranges: true,
};

const flowOptionsMapping = {
  esproposal_class_instance_fields: "classProperties",
  esproposal_class_static_fields: "classProperties",
  esproposal_export_star_as: "exportNamespaceFrom",
  esproposal_decorators: "decorators-legacy",
  esproposal_nullish_coalescing: "nullishCoalescingOperator",
  esproposal_optional_chaining: "optionalChaining",
  types: "flowComments",
};

const summary = {
  passed: true,
  allowed: {
    success: [],
    failure: [],
  },
  disallowed: {
    success: [],
    failure: [],
  },
  unrecognized: [],
};

const tests = get_tests(TESTS_FOLDER);
const whitelist = get_whitelist(WHITELIST_PATH);

const unrecognized = new Set(whitelist);

tests.forEach(section => {
  section.forEach(test => {
    const shouldSuccess =
      test.expected_ast &&
      (!Array.isArray(test.expected_ast.errors) ||
        test.expected_ast.errors.length === 0);
    const inWhitelist = whitelist.indexOf(test.file) > -1;

    const babelParserOptions = Object.assign({}, options);
    babelParserOptions.plugins = babelParserOptions.plugins.slice();

    if (test.options) {
      Object.keys(test.options).forEach(option => {
        if (!test.options[option]) {
          const idx = babelParserOptions.plugins.indexOf(
            flowOptionsMapping[option]
          );
          if (idx) {
            babelParserOptions.plugins.splice(idx, 1);
          }
          return;
        }
        if (!flowOptionsMapping[option]) {
          throw new Error("Parser options not mapped " + option);
        }
        babelParserOptions.plugins.push(flowOptionsMapping[option]);
      });
    }

    let failed = false;
    let exception = null;
    try {
      parse(test.content, babelParserOptions);
    } catch (e) {
      exception = e;
      failed = true;

      // lets retry in script mode
      if (shouldSuccess) {
        try {
          parse(
            test.content,
            Object.assign({}, babelParserOptions, { sourceType: "script" })
          );
          exception = null;
          failed = false;
        } catch (e) {}
      }
    }

    const isSuccess = shouldSuccess !== failed;
    const isAllowed = isSuccess !== inWhitelist;

    summary[isAllowed ? "allowed" : "disallowed"][
      isSuccess ? "success" : "failure"
    ].push({ test, exception, shouldSuccess, babelParserOptions });
    summary.passed &= isAllowed;

    unrecognized.delete(test.file);

    process.stdout.write(chalk.gray("."));
  });
});

summary.unrecognized = Array.from(unrecognized);
summary.passed &= summary.unrecognized.length === 0;

// This is needed because, after the dots written using
// `process.stdout.write(".")` there is no final newline
console.log();

if (summary.disallowed.failure.length || summary.disallowed.success.length) {
  console.log("\n-- FAILED TESTS --");
  summary.disallowed.failure.forEach(
    ({ test, shouldSuccess, exception, babelParserOptions }) => {
      console.log(chalk.red(`✘ ${test.file}`));
      if (shouldSuccess) {
        console.log(chalk.yellow("  Should parse successfully, but did not"));
        console.log(chalk.yellow(`  Failed with: \`${exception.message}\``));
      } else {
        console.log(chalk.yellow("  Should fail parsing, but did not"));
      }
      console.log(
        chalk.yellow(
          `  Active plugins: ${JSON.stringify(babelParserOptions.plugins)}`
        )
      );
    }
  );
  summary.disallowed.success.forEach(
    ({ test, shouldSuccess, babelParserOptions }) => {
      console.log(chalk.red(`✘ ${test.file}`));
      if (shouldSuccess) {
        console.log(
          chalk.yellow(
            "  Correctly parsed successfully, but" +
              " was disallowed by the whitelist"
          )
        );
      } else {
        console.log(
          chalk.yellow(
            "  Correctly failed parsing, but" +
              " was disallowed by the whitelist"
          )
        );
      }
      console.log(
        chalk.yellow(
          `  Active plugins: ${JSON.stringify(babelParserOptions.plugins)}`
        )
      );
    }
  );
}

console.log("-- SUMMARY --");
console.log(
  chalk.green("✔ " + summary.allowed.success.length + " tests passed")
);
console.log(
  chalk.green(
    "✔ " +
      summary.allowed.failure.length +
      " tests failed but were allowed in the whitelist"
  )
);
console.log(
  chalk.red("✘ " + summary.disallowed.failure.length + " tests failed")
);
console.log(
  chalk.red(
    "✘ " +
      summary.disallowed.success.length +
      " tests passed but were disallowed in the whitelist"
  )
);
console.log(
  chalk.red(
    "✘ " +
      summary.unrecognized.length +
      " tests specified in the whitelist were not found"
  )
);

// Some padding to separate the output from the message `make`
// adds at the end of failing scripts
console.log();

if (shouldUpdateWhitelist) {
  update_whitelist(summary);
  console.log("\nWhitelist updated");
} else {
  process.exit(summary.passed ? 0 : 1);
}
