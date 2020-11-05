import babelRuntimeTestcases from "./babel-runtime.mjs";
import babelRuntimeCorejs3Testcases from "./babel-runtime-corejs3.mjs";
import testRunner from "./test-runner.mjs";

(async () => {
  await testRunner(babelRuntimeTestcases);
  await testRunner(babelRuntimeCorejs3Testcases);
})();
