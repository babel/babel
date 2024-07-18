import { Linter, ESLint } from "eslint";
import unpad from "dedent";
import path from "path";
import { fileURLToPath } from "url";
import {
  eslintConfigCompat,
  babelESLintParserPath,
} from "./eslintConfigCompat.cjs";
import * as parser from "../../../babel-eslint-parser/lib/index.cjs";
import babelEslintParser from "@babel/eslint-parser";
import globals from "globals";

export default function verifyAndAssertMessages(
  code,
  rules = {},
  expectedMessages = [],
  sourceType,
  overrideConfig,
) {
  const linter = new Linter();
  if (parseInt(ESLint.version, 10) < 9) {
    linter.defineParser(babelESLintParserPath, parser);
  }

  const languageOptions = {
    globals: (overrideConfig && overrideConfig.globals) ?? {
      ...globals.node,
      ...globals.es2024,
    },
    parser: babelEslintParser.default || babelEslintParser,
    parserOptions: {
      sourceType,
      requireConfigFile: false,
      ...(overrideConfig && overrideConfig.parserOptions),
      babelOptions: {
        configFile: path.resolve(
          path.dirname(fileURLToPath(import.meta.url)),
          "../../../babel-eslint-shared-fixtures/config/babel.config.js",
        ),
        ...(overrideConfig &&
          overrideConfig.parserOptions &&
          overrideConfig.parserOptions.babelOptions),
      },
    },
  };

  const messages = linter.verify(
    unpad(`${code}`),
    eslintConfigCompat({
      languageOptions,
      rules,
    }),
  );

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
