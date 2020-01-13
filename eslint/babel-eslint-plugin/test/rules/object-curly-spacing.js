import rule from "../../src/rules/object-curly-spacing";
import RuleTester from "../helpers/RuleTester";

const ruleTester = new RuleTester();
ruleTester.run("@babel/object-curly-spacing", rule, {
  valid: [
    {
      code: 'export x from "mod";',
    },
  ],

  invalid: [],
});
