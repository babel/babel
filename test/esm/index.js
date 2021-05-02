import babelRuntimeTestcases from "./babel-runtime.js";
import babelRuntimeCorejs3Testcases from "./babel-runtime-corejs3.js";
import testRunner from "./test-runner.js";

(async () => {
  await testRunner(babelRuntimeTestcases);
  await testRunner(babelRuntimeCorejs3Testcases);
})();
