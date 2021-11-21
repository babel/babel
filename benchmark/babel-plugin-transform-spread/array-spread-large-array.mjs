import runner from "./runner.mjs";

runner({
  code: `
    var bar = Array.from({ length: 456000 }, (_, i) => i);

    function foo(a) {
      return [0, ...a, 1, ...a, 2];
    }

    function work() {
      return foo(bar).length;
    }
  `,
  expect: 3 + 2 * 456000,
  loopCount: 1,
});
