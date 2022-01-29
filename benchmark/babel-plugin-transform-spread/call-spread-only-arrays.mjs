import runner from "./runner.mjs";

runner({
  code: `
    const bar = ["bacon", "egg", "spam"];

    function foo() {
      return arguments.length;
    }

    function work() {
      return foo("ham", "spam", ...bar, "ham", "spam", ...bar, "ham", "spam");
    }
  `,
  expect: 12,
  loopCount: 100,
});
