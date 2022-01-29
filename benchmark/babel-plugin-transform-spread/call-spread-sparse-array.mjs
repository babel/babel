import runner from "./runner.mjs";

runner({
  code: `
    // defer initialization to prevent Babel guessing variable type,
    // because if it can guess, the plugin emits Array-specific code
    var bar;
    bar = new Array(3);

    function foo() {
      return arguments.length;
    }

    function work() {
      return foo(...bar);
    }
  `,
  expect: 3,
  loopCount: 100,
});
