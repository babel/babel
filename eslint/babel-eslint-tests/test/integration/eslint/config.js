import verifyAndAssertMessages from "../../helpers/verifyAndAssertMessages.js";

describe("ESLint config", () => {
  it('should set ecmaVersion to latest and sourceType to "module" by default', () => {
    // ImportDeclarations result in a parser error if ecmaVersion < 2015 and sourceType != "module".
    verifyAndAssertMessages('import { hello } from "greetings"', {});
  });

  it('should allow ecmaVersion to be "latest"', () => {
    // ImportDeclarations result in a parser error if ecmaVersion < 2015 and sourceType != "module".
    verifyAndAssertMessages(
      'import { hello } from "greetings"',
      {},
      undefined,
      undefined,
      {
        parserOptions: {
          ecmaVersion: "latest",
        },
      },
    );
  });

  it('should allow sourceType to be "commonjs"', () => {
    // sourceType "commonjs" allows require() calls and global returns
    verifyAndAssertMessages(
      'return require("greetings").hello',
      {},
      undefined,
      undefined,
      {
        parserOptions: {
          sourceType: "commonjs",
        },
      },
    );
  });
});
