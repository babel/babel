import testRunner from "@babel/helper-transform-fixture-test-runner";

const fixtures = new URL(
  "./define-helper-fixtures",
  import.meta.url,
).pathname.slice(1);
testRunner(fixtures, "define-helper");
