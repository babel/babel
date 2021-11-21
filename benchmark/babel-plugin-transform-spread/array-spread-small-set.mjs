import runner from "./runner.mjs";

runner({
  code: `
    var bar = Array.from({ length: 123 }, (_, i) => i);
    var set = new Set(bar);

    function foo(a) {
      return [0, ...a, 1, ...a, 2];
    }

    function work() {
      return foo(set).length;
    }
  `,
  expect: 3 + 2 * 123,
  loopCount: 100,
});
