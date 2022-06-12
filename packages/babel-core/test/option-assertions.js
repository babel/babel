import { assertInputSourceMap } from "../lib/config/validation/option-assertions.js";

const sampleSourceMapJson = {
  version: 3,
  sources: ["/home/aqua/coding/atri/src/app/app.tsx"],
  names: [],
  mappings: ";;;AAAA",
  sourcesContent: [
    'ReactDOM.render(, document.body.querySelector("#root"))\\n',
  ],
};

const loc = {
  name: "inputSourceMap",
  parent: { type: "root", source: "arguments" },
  type: "option",
};

const testAssetsPass = [
  [JSON.stringify(sampleSourceMapJson), sampleSourceMapJson],
  [undefined, undefined],
  [false, false],
  [{}, {}],
];

const testAssetsFailed = ["kaljsdfkl", 42];

describe("assertInputSourceMap", () => {
  it.each(testAssetsPass)("%p should work", (input, expected) => {
    return expect(assertInputSourceMap(loc, input)).toEqual(expected);
  });

  it.each(testAssetsFailed)("%p should throw error", input => {
    return expect(() => {
      assertInputSourceMap(loc, input);
    }).toThrowError();
  });
});
