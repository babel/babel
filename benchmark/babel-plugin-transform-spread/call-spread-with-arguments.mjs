import runner from "./runner.mjs";

runner({
  code: `
    function foo() {
      return arguments.length;
    }

    function bar() {
      return foo("ham", "spam", ...arguments, "ham", "spam");
    }

    function work() {
      return bar("bacon", "egg", "spam");
    }
  `,
  expect: 7,
  loopCount: 100,
});
