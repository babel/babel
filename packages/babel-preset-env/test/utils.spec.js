"use strict";

const utils = require("../lib/utils");
const assert = require("assert");

const { prettifyTargets, prettifyVersion, semverify } = utils;

describe("utils", () => {
  describe("semverify", () => {
    it("returns", () => {
      assert.strictEqual(semverify("1"), "1.0.0");
      assert.strictEqual(semverify("1.0"), "1.0.0");
      assert.strictEqual(semverify("1.0.0"), "1.0.0");
      assert.strictEqual(semverify(1), "1.0.0");
      assert.strictEqual(semverify(1.2), "1.2.0");
    });
  });

  describe("prettifyVersion", () => {
    it("returns", () => {
      assert.strictEqual(prettifyVersion(true), true);
      assert.strictEqual(prettifyVersion("0.16.0"), "0.16");
      assert.strictEqual(prettifyVersion("1.0.0"), "1");
      assert.strictEqual(prettifyVersion("1.1.0"), "1.1");
      assert.strictEqual(prettifyVersion("1.0.2"), "1.0.2");
      assert.strictEqual(prettifyVersion("1.2.3"), "1.2.3");
    });
  });

  describe("prettifyTargets", () => {
    it("returns", () => {
      assert.deepStrictEqual(prettifyTargets({}), {});

      assert.deepStrictEqual(
        prettifyTargets({
          chrome: "54.0.0",
          electron: "1.6.0",
          node: "0.12.0",
        }),
        {
          chrome: "54",
          electron: "1.6",
          node: "0.12",
        },
      );
    });
  });
});
