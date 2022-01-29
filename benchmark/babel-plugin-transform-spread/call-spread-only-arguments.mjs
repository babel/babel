import runner from "./runner.mjs";

runner({
  code: `
    function foo() {
      return arguments.length;
    }

    function bar() {
      return foo(...arguments);
    }

    function work() {
      return bar("bacon", "egg", "spam");
    }
  `,
  expect: 3,
  loopCount: 100,
});
