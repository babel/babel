import type { Rule } from "eslint";
import type { Literal, Property } from "estree";
const messageId = "mustMatchPattern";

const pattern = /(?:('|`)[^'`]*\1|[A-Z]).*[.?]$/s;

export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "enforce @babel/parser's error message formatting.",
    },
    messages: {
      [messageId]: `Report message does not match the pattern ${pattern.toString()}.`,
    },
  },
  create({ report }) {
    return {
      "CallExpression[callee.type='Identifier'][callee.name='makeErrorTemplates'] > ObjectExpression > Property[value.type='Literal']"(
        node: Property,
      ) {
        const { value } = node as { value: Literal };
        if (typeof value.value === "string" && pattern.test(value.value)) {
          return;
        }
        report({
          node: value,
          messageId,
        });
      },
    };
  },
} satisfies Rule.RuleModule;
