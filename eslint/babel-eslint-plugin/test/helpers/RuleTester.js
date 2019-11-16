var RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
    parser: 'babel-eslint'
});

module.exports = RuleTester;
