import testRunner from "@babel/helper-transform-fixture-test-runner";

let fixtures = new URL("./define-helper-fixtures", import.meta.url).pathname;
if (process.platform === "win32") {
  fixtures = fixtures.slice(1);
}
testRunner(fixtures, "define-helper");
