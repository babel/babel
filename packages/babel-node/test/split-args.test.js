import { splitArgs } from "../lib/split-args.js";

describe("babel-node", () => {
  describe("splitArgs", () => {
    it("basic", () => {
      expect(splitArgs(["a", "b", "c"])).toEqual({
        programArgs: [],
        fileName: "a",
        userArgs: ["b", "c"],
      });
    });

    it("node flag with no value", () => {
      expect(splitArgs(["--allow-addons", "b", "c"])).toEqual({
        programArgs: ["--allow-addons"],
        fileName: "b",
        userArgs: ["c"],
      });

      expect(splitArgs(["--allow-addons", "--", "b", "c"])).toEqual({
        programArgs: ["--allow-addons"],
        fileName: "b",
        userArgs: ["c"],
      });

      expect(splitArgs(["--allow-addons", "a", "--", "b", "c"])).toEqual({
        programArgs: ["--allow-addons"],
        fileName: "a",
        userArgs: ["--", "b", "c"],
      });
    });

    it("node flag with value", () => {
      expect(splitArgs(["--inspect", "--", "b", "c"])).toEqual({
        programArgs: ["--inspect"],
        fileName: "b",
        userArgs: ["c"],
      });

      expect(splitArgs(["--inspect", "1234", "b", "c"])).toEqual({
        programArgs: ["--inspect", "1234"],
        fileName: "b",
        userArgs: ["c"],
      });

      expect(splitArgs(["--inspect", "1234", "--", "b", "c"])).toEqual({
        programArgs: ["--inspect", "1234"],
        fileName: "b",
        userArgs: ["c"],
      });

      expect(splitArgs(["--inspect", "-", "b", "c"])).toEqual({
        programArgs: ["--inspect"],
        fileName: "-", // stdin
        userArgs: ["b", "c"],
      });
    });

    it("no filename", () => {
      expect(splitArgs(["--inspect", "-e", "b", "c"])).toEqual({
        programArgs: ["--inspect", "-e", "b"],
        fileName: null,
        userArgs: ["c"],
      });

      expect(splitArgs(["--print", "b", "--", "c"])).toEqual({
        programArgs: ["--print", "b"],
        fileName: null,
        userArgs: ["c"],
      });

      expect(splitArgs(["--print", "b", "-", "c"])).toEqual({
        programArgs: ["--print", "b"],
        fileName: null,
        userArgs: ["-", "c"],
      });
    });

    it("inspect", () => {
      expect(splitArgs(["inspect", "-p", "1", "b", "c"])).toEqual({
        programArgs: ["inspect", "-p", "1"],
        fileName: "b",
        userArgs: ["c"],
      });
    });
  });
});
