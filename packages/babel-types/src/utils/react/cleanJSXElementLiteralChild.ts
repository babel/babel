import { stringLiteral } from "../../builders/generated/index.ts";
import type * as t from "../../index.ts";
import { inherits } from "../../index.ts";

export default function cleanJSXElementLiteralChild(
  child: t.JSXText,
  args: t.Node[],
) {
  const lines = child.value.split(/\r\n|\n|\r/);

  let lastNonEmptyLine = 0;

  for (let i = 0; i < lines.length; i++) {
    if (/[^ \t]/.exec(lines[i])) {
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
      trimmedLine = trimmedLine.replace(/^ +/, "");
    }

    // trim whitespace touching an endline
    if (!isLastLine) {
      trimmedLine = trimmedLine.replace(/ +$/, "");
    }

    if (trimmedLine) {
      if (!isLastNonEmptyLine) {
        trimmedLine += " ";
      }

      str += trimmedLine;
    }
  }

  // Decode normalized whitespace entities that the parser preserved in
  // JSXText.value (e.g. &#x20; for entity-encoded space). These were
  // kept as entities so that the trimming logic above would not strip
  // whitespace the developer explicitly encoded as HTML entities.
  // See: https://github.com/babel/babel/issues/17683
  if (str) {
    str = str
      .replace(/&#x20;/gi, " ")
      .replace(/&#x9;/gi, "\t")
      .replace(/&#xa;/gi, "\n")
      .replace(/&#xd;/gi, "\r");
  }

  if (str) args.push(inherits(stringLiteral(str), child));
}
