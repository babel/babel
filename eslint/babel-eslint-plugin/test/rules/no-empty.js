import plugin from "../../lib/index.js";
import RuleTester from "../../../babel-eslint-shared-fixtures/utils/RuleTester.js";

const rule = plugin.rules["no-empty"];

const ruleTester = new RuleTester();
ruleTester.run("@babel/no-empty", rule, {
  valid: [
    // do{} is shorter than void 0
    { code: "var x = do{}" },
    // async do{} is shorter than Promise.resolve(void 0)
    {
      code: "var y = await async do {}",
    },
  ],
  invalid: [
    {
      code: "var x = do { if(foo) {} }",
      errors: [
        {
          message: "Empty block statement.",
          suggestions: [
            {
              messageId: "suggestComment",
              output: "var x = do { if(foo) { /* empty */ } }",
            },
          ],
        },
      ],
    },
    {
      code: "while (foo) {}",
      errors: [
        {
          message: "Empty block statement.",
          suggestions: [
            {
              messageId: "suggestComment",
              output: "while (foo) { /* empty */ }",
            },
          ],
        },
      ],
    },
  ],
});
