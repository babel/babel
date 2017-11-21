import assert from "assert";
import getTargets from "../src/targets-parser";

describe("getTargets", () => {
  it("parses", () => {
    assert.deepEqual(
      getTargets({
        chrome: 49,
        firefox: "55",
        ie: "9",
        node: "6.10",
        electron: "1.6",
      }),
      {
        chrome: "49.0.0",
        electron: "1.6.0",
        firefox: "55.0.0",
        ie: "9.0.0",
        node: "6.10.0",
      },
    );
  });

  describe("browser", () => {
    it("merges browser key targets", () => {
      assert.deepEqual(
        getTargets({
          browsers: "chrome 56, ie 11, firefox 51, safari 9",
          chrome: "49",
          firefox: "55",
          ie: "9",
        }),
        {
          chrome: "49.0.0",
          firefox: "55.0.0",
          ie: "9.0.0",
          safari: "9.0.0",
        },
      );
    });

    it("works with TP versions", () => {
      assert.deepEqual(
        getTargets({
          browsers: "safari tp",
        }),
        {
          safari: "tp",
        },
      );
    });

    it("returns TP version in lower case", () => {
      assert.deepEqual(
        getTargets({
          safari: "TP",
        }),
        {
          safari: "tp",
        },
      );
    });

    it("ignores invalid", () => {
      assert.deepEqual(
        getTargets({
          browsers: 59,
          chrome: "49",
          firefox: "55",
          ie: "11",
        }),
        {
          chrome: "49.0.0",
          firefox: "55.0.0",
          ie: "11.0.0",
        },
      );
    });
  });

  describe("node", () => {
    it("should return the current node version with option 'current'", () => {
      assert.deepEqual(
        getTargets({
          node: true,
        }),
        {
          node: process.versions.node,
        },
      );
    });
  });

  describe("electron", () => {
    it("should be its own target", () => {
      assert.deepEqual(
        getTargets({
          chrome: "46",
          electron: "0.34",
        }),
        {
          chrome: "46.0.0",
          electron: "0.34.0",
        },
      );
    });
  });
});
