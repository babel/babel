var ESLintTester = require("./eslint").RuleTester;

console.log("Use babel-eslint for test suite");
ESLintTester.setDefaultConfig({
    parser: "../../index"
});
