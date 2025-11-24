import runner from "@babel/helper-plugin-test-runner";

runner(import.meta.url);

it("noop", () => {
  // no tests for Babel 8
});
