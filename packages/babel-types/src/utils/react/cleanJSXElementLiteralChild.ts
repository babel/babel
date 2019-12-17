import { stringLiteral } from "../../builders/generated";
import type * as t from "../..";

const NEW_LINE_REGEX = process.env.BABEL_8_BREAKING
  ? /\r\n|[\n\r\u2028\u2029]/
  : /\r\n|\n|\r/;

export default function cleanJSXElementLiteralChild(
  child: {
    value: string;
  },
  args: Array<t.Node>,
) {
  const lines = child.value.split(NEW_LINE_REGEX);

  let lastNonEmptyLine = 0;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/[^ \t]/)) {
      lastNonEmptyLine = i;
    }
  }

  let str = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const isFirstLine = i === 0;
    const isLastLine = i === lines.length - 1;
    const isLastNonEmptyLine = i === lastNonEmptyLine;

    // replace rendered whitespace tabs with spaces
    let trimmedLine = line.replace(/\t/g, " ");

    // trim whitespace touching a newline
    if (!isFirstLine) {
      trimmedLine = trimmedLine.replace(/^[ ]+/, "");
    }

    // trim whitespace touching an endline
    if (!isLastLine) {
      trimmedLine = trimmedLine.replace(/[ ]+$/, "");
    }

    if (trimmedLine) {
      if (!isLastNonEmptyLine) {
        trimmedLine += " ";
      }

      str += trimmedLine;
    }
  }

  if (str) args.push(stringLiteral(str));
}
