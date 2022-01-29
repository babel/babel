import runner from "./runner.mjs";

runner({
  code: `
    function arrayOf() {
      return [...arguments];
    }

    function work() {
      return arrayOf("bacon", "egg", "spam");
    }
  `,
  expect: ["bacon", "egg", "spam"],
  loopCount: 100,
});
