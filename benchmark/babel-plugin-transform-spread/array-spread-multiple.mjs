import runner from "./runner.mjs";

runner({
  code: `
    var bar = ["egg", , "spam"];

    function work(a = bar) {
      return [...a, ...a, ...a];
    }
  `,
  expect: ["egg", void 0, "spam", "egg", void 0, "spam", "egg", void 0, "spam"],
  loopCount: 100,
});
