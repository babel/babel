import fs from "fs/promises";
import chalk from "chalk";
import { parse as parser } from "../../../packages/babel-parser/lib/index.js";

const dot = chalk.gray(".");

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
    }

    test.result = test.expectedError !== test.actualError ? "fail" : "pass";

    return test;
  }

  parse(test, parser) {
    parser(test.contents, {
      sourceType: test.sourceType,
      plugins: test.plugins,
      sourceFilename: test.fileName,
    });
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

    const toRemove = summary.disallowed.success
      .concat(summary.disallowed.failure)
      .map(test => test.id)
      .concat(summary.unrecognized);

    const updated = summary.disallowed.falsePositive
      .concat(summary.disallowed.falseNegative)
      .map(test => test.id);

    for (const line of contents.split("\n")) {
      const testId = line.replace(/#.*$/, "").trim();
      if (!toRemove.includes(testId) && line) {
        updated.push(line);
      }
    }

    updated.sort();

    await fs.writeFile(this.allowlist, updated.join("\n") + "\n", "utf8");
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
      badnewsDetails.push(...tests.map(test => `  ${test.id || test}`));
    });

    console.log(`Testing complete (${summary.count} tests).`);
    console.log("Summary:");
    console.log(chalk.green(goodnews.join("\n").replace(/^/gm, " ✔ ")));

    if (!summary.passed) {
      console.log("");
      console.log(chalk.red(badnews.join("\n").replace(/^/gm, " ✘ ")));
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
