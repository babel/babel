var ESLintTester = require("./eslint/node_modules/eslint-tester");

console.log("Use babel-eslint for test suite");
ESLintTester.setDefaultConfig({
    parser: "../../index"
});
