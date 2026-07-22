import {
  buildProcessTests,
  buildParallelProcessTests,
} from "@babel/helper-transform-fixture-test-runner";

export const runParallel = buildParallelProcessTests(
  "babel-register",
  buildProcessTests(
    new URL("../fixtures/preload", import.meta.url),
    function (test) {
      test.opts.env = { ...test.opts.env, BABEL_DISABLE_CACHE: true };
    },
  ),
);
