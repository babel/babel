import _mergeSourceMap from "../lib/transformation/file/merge-map.js";
const mergeSourceMap = _mergeSourceMap.default || _mergeSourceMap;

describe("merge-map", () => {
  it("returns a plain js object", () => {
    const inputMap = {
      file: "file.js",
      mappings: [],
      names: [],
      sources: ["file.ts"],
      version: 3,
    };

    const outputMap = {
      file: "file.transpiled.js",
      mappings: [],
      names: [],
      sources: ["file.js"],
      version: 3,
    };

    const map = mergeSourceMap(inputMap, outputMap, "file.transpiled.js");
    expect(typeof map).toBe("object");
    expect(Object.prototype.toString.call(map)).toBe("[object Object]");
    expect(Object.getPrototypeOf(map)).toBe(Object.prototype);
  });
});
