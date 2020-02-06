import path from "path";
import eslint from "eslint";
import unpad from "dedent";
import * as parser from "@babel/eslint-parser";

export default function verifyAndAssertMessages(
  code,
  rules = {},
  expectedMessages = [],
  sourceType,
  overrideConfig,
) {
  const linter = new eslint.Linter();
  linter.defineParser("@babel/eslint-parser", parser);

  const messages = linter.verify(unpad(`${code}`), {
    parser: "@babel/eslint-parser",
    rules,
    env: {
      node: true,
      es6: true,
    },
    ...overrideConfig,
    parserOptions: {
      sourceType,
      requireConfigFile: false,
      babelOptions: {
        configFile: require.resolve(
          "@babel/eslint-shared-fixtures/config/babel.config.js",
        ),
      },
      ...overrideConfig?.parserOptions,
    },
  });

  if (messages.length !== expectedMessages.length) {
    throw new Error(
      `Expected ${expectedMessages.length} message(s), got ${
        messages.length
      }\n${JSON.stringify(messages, null, 2)}`,
    );
  }

  messages.forEach((message, i) => {
    const formattedMessage = `${message.line}:${message.column} ${
      message.message
    }${message.ruleId ? ` ${message.ruleId}` : ""}`;
    const expectedMessage = expectedMessages[i];

    if (expectedMessage instanceof RegExp) {
      if (!expectedMessage.test(formattedMessage)) {
        throw new Error(
          `
          Message ${i} does not pass RegExp test:
          Test:   ${expectedMessage}
          Actual: ${formattedMessage}
        `,
        );
      }
    } else if (formattedMessage !== expectedMessage) {
      throw new Error(
        `
          Message ${i} does not match:
          Expected: ${expectedMessage}
          Actual:   ${formattedMessage}
        `,
      );
    }
  });
}
