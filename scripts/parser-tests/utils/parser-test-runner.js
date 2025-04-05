import fs from "node:fs/promises";
import colors from "picocolors";
import { parse as parser } from "../../../packages/babel-parser/lib/index.js";

const dot = colors.gray(".");

class TestRunner {
  constructor({
    testDir,
    allowlist,
    logInterval = 1,
    shouldUpdate,
    getTests,
    parse = this.parse,
  }) {
    this.testDir = testDir;
    this.allowlist = allowlist;
    this.logInterval = logInterval;
    this.shouldUpdate = shouldUpdate;
    this.getTests = getTests;
    this.parse = parse;
  }

  async run() {
    const allowlistP = this.getAllowlist();

    console.log(`Now running tests...`);

    const results = [];
    for await (const result of this.runTests()) {
      results.push(result);
      if (results.length % this.logInterval === 0) process.stdout.write(dot);
    }
    process.stdout.write("\n");

    const summary = this.interpret(results, await allowlistP);

    await this.output(summary);
  }

  async *runTests() {
    for await (const test of this.getTests()) {
      yield this.runTest(test);
    }
  }

  runTest(test) {
    try {
      this.parse(test, parser);
      test.actualError = false;
    } catch (err) {
      test.actualError = true;
      test.actualErrorObject = err;
    }

    test.result = test.expectedError !== test.actualError ? "fail" : "pass";

    return test;
  }

  parse(test, parser) {
    const tests = typeof test.contents === "string" ? [test] : test.contents;

    for (const { contents, ...options } of tests) {
      parser(contents, options);
    }
  }

  async getAllowlist() {
    const contents = await fs.readFile(this.allowlist, "utf-8");
    const table = new Set();

    for (const line of contents.split("\n")) {
      const filename = line.replace(/#.*$/, "").trim();
      if (filename) table.add(filename);
    }

    return table;
  }

  async updateAllowlist(summary) {
    const contents = await fs.readFile(this.allowlist, "utf-8");

    const toRemove = new Set(
      summary.disallowed.success
        .concat(summary.disallowed.failure)
        .map(test => test.id)
        .concat(summary.unrecognized)
    );

    const allowedFalsePositiveIds = new Set(
      summary.allowed.falsePositive.map(test => test.id)
    );

    let invalidWithoutError = [];
    let validWithError = [];

    for (const line of contents.split("\n")) {
      const testId = line.replace(/#.*$/, "").trim();
      if (testId && !toRemove.has(testId)) {
        if (allowedFalsePositiveIds.has(testId)) {
          invalidWithoutError.push(line);
        } else {
          validWithError.push(line);
        }
      }
    }

    invalidWithoutError = invalidWithoutError.concat(
      summary.disallowed.falsePositive.map(test => test.id)
    );
    validWithError = validWithError.concat(
      summary.disallowed.falseNegative.map(test => test.id)
    );

    invalidWithoutError.sort();
    validWithError.sort();

    const errorsMap = new Map();
    summary.allowed.falseNegative
      .concat(summary.disallowed.falseNegative)
      .forEach(test => {
        errorsMap.set(test.id, test.actualErrorObject);
      });

    const updated = [
      `# ${invalidWithoutError.length} invalid programs did not produce a parsing error\n`,
      "\n",
      invalidWithoutError.join("\n"),
      "\n",
      "\n",
      "\n",
      `# ${validWithError.length} valid programs produced a parsing error\n`,
      "\n",
      ...validWithError
        // .map(
        //   v =>
        //     `${v}\n# ${JSON.stringify(errorsMap.get(v), null, 2)
        //       .trimEnd()
        //       .replace(/\n/g, "\n#")}\n`
        // )
        .join("\n"),
    ];

    await fs.writeFile(this.allowlist, updated.join("") + "\n", "utf8");
  }

  interpret(results, allowlist) {
    const summary = {
      passed: true,
      allowed: {
        success: [],
        failure: [],
        falsePositive: [],
        falseNegative: [],
      },
      disallowed: {
        success: [],
        failure: [],
        falsePositive: [],
        falseNegative: [],
      },
      unrecognized: null,
      count: results.length,
    };

    results.forEach(function (result) {
      let classification, isAllowed;
      const inAllowlist = allowlist.has(result.id);
      allowlist.delete(result.id);

      if (!result.expectedError) {
        if (!result.actualError) {
          classification = "success";
          isAllowed = !inAllowlist;
        } else {
          classification = "falseNegative";
          isAllowed = inAllowlist;
        }
      } else {
        if (!result.actualError) {
          classification = "falsePositive";
          isAllowed = inAllowlist;
        } else {
          classification = "failure";
          isAllowed = !inAllowlist;
        }
      }

      summary.passed &= isAllowed;
      summary[isAllowed ? "allowed" : "disallowed"][classification].push(
        result
      );
    });

    summary.unrecognized = Array.from(allowlist);
    summary.passed = !!summary.passed && summary.unrecognized.length === 0;

    return summary;
  }

  async output(summary) {
    const goodnews = [
      summary.allowed.success.length + " valid programs parsed without error",
      summary.allowed.failure.length +
        " invalid programs produced a parsing error",
      summary.allowed.falsePositive.length +
        " invalid programs did not produce a parsing error" +
        " (and allowed by the allowlist file)",
      summary.allowed.falseNegative.length +
        " valid programs produced a parsing error" +
        " (and allowed by the allowlist file)",
    ];
    const badnews = [];
    const badnewsDetails = [];

    void [
      {
        tests: summary.disallowed.success,
        label:
          "valid programs parsed without error" +
          " (in violation of the allowlist file)",
      },
      {
        tests: summary.disallowed.failure,
        label:
          "invalid programs produced a parsing error" +
          " (in violation of the allowlist file)",
      },
      {
        tests: summary.disallowed.falsePositive,
        label:
          "invalid programs did not produce a parsing error" +
          " (without a corresponding entry in the allowlist file)",
      },
      {
        tests: summary.disallowed.falseNegative,
        label:
          "valid programs produced a parsing error" +
          " (without a corresponding entry in the allowlist file)",
      },
      {
        tests: summary.unrecognized,
        label: "non-existent programs specified in the allowlist file",
      },
    ].forEach(function ({ tests, label }) {
      if (!tests.length) {
        return;
      }

      const desc = tests.length + " " + label;

      badnews.push(desc);
      badnewsDetails.push(desc + ":");
      badnewsDetails.push(
        ...tests.map(
          test =>
            `  ${test.id || test} ${test.expectedError} ${test.actualError}`
        )
      );
    });

    console.log(`Testing complete (${summary.count} tests).`);
    console.log("Summary:");
    console.log(colors.green(goodnews.join("\n").replace(/^/gm, " ✔ ")));

    if (!summary.passed) {
      console.log("");
      console.log(colors.red(badnews.join("\n").replace(/^/gm, " ✘ ")));
      console.log("");
      console.log("Details:");
      console.log(badnewsDetails.join("\n").replace(/^/gm, "   "));
    }

    if (this.shouldUpdate) {
      await this.updateAllowlist(summary);
      console.log("");
      console.log("Allowlist file updated.");
    } else {
      process.exitCode = summary.passed ? 0 : 1;
    }
  }
}

export default TestRunner;
