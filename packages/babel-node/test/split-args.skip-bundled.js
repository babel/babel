import { splitArgs } from "../lib/split-args.js";

describe("babel-node", () => {
  describe("splitArgs", () => {
    it("basic", () => {
      expect(splitArgs(["a", "b", "c"])).toEqual({
        explicitSeparator: false,
        programArgs: [],
        fileName: "a",
        userArgs: ["b", "c"],
      });
    });

    it("node flag with no value", () => {
      expect(splitArgs(["--allow-addons", "b", "c"])).toEqual({
        explicitSeparator: false,
        programArgs: ["--allow-addons"],
        fileName: "b",
        userArgs: ["c"],
      });

      expect(splitArgs(["--allow-addons", "--", "b", "c"])).toEqual({
        explicitSeparator: true,
        programArgs: ["--allow-addons"],
        fileName: "b",
        userArgs: ["c"],
      });

      expect(splitArgs(["--allow-addons", "a", "--", "b", "c"])).toEqual({
        explicitSeparator: false,
        programArgs: ["--allow-addons"],
        fileName: "a",
        userArgs: ["--", "b", "c"],
      });
    });

    it("node flag with value", () => {
      expect(splitArgs(["--inspect", "--", "b", "c"])).toEqual({
        explicitSeparator: true,
        programArgs: ["--inspect"],
        fileName: "b",
        userArgs: ["c"],
      });

      expect(splitArgs(["--inspect", "1234", "b", "c"])).toEqual({
        explicitSeparator: false,
        programArgs: ["--inspect", "1234"],
        fileName: "b",
        userArgs: ["c"],
      });

      expect(splitArgs(["--inspect", "1234", "--", "b", "c"])).toEqual({
        explicitSeparator: true,
        programArgs: ["--inspect", "1234"],
        fileName: "b",
        userArgs: ["c"],
      });

      expect(splitArgs(["--inspect", "-", "b", "c"])).toEqual({
        explicitSeparator: false,
        programArgs: ["--inspect"],
        fileName: "-", // stdin
        userArgs: ["b", "c"],
      });
    });

    it("no filename", () => {
      expect(splitArgs(["--inspect", "-e", "b", "c"])).toEqual({
        explicitSeparator: false,
        programArgs: ["--inspect", "-e", "b"],
        fileName: null,
        userArgs: ["c"],
      });

      expect(splitArgs(["--print", "b", "--", "c"])).toEqual({
        explicitSeparator: true,
        programArgs: ["--print", "b"],
        fileName: null,
        userArgs: ["c"],
      });

      expect(splitArgs(["--print", "b", "-", "c"])).toEqual({
        explicitSeparator: false,
        programArgs: ["--print", "b"],
        fileName: null,
        userArgs: ["-", "c"],
      });
    });

    it("inspect", () => {
      expect(splitArgs(["inspect", "-p", "1", "b", "c"])).toEqual({
        explicitSeparator: false,
        programArgs: ["inspect", "-p", "1"],
        fileName: "b",
        userArgs: ["c"],
      });
    });
  });
});
