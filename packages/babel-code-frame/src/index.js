import jsTokens from "js-tokens";
import esutils from "esutils";
import chalk from "chalk";

/**
 * Chalk styles for token types.
 */

let defs = {
  string:     chalk.red,
  punctuator: chalk.bold,
  curly:      chalk.green,
  parens:     chalk.blue.bold,
  square:     chalk.yellow,
  keyword:    chalk.cyan,
  number:     chalk.magenta,
  regex:      chalk.magenta,
  comment:    chalk.grey,
  invalid:    chalk.inverse
};

/**
 * RegExp to test for newlines in terminal.
 */

const NEWLINE = /\r\n|[\n\r\u2028\u2029]/;

/**
 * Get the type of token, specifying punctuator type.
 */

function getTokenType(match) {
  let token = jsTokens.matchToToken(match);
  if (token.type === "name" && esutils.keyword.isReservedWordES6(token.value)) {
    return "keyword";
  }

  if (token.type === "punctuator") {
    switch (token.value) {
    case "{":
    case "}":
      return "curly";
    case "(":
    case ")":
      return "parens";
    case "[":
    case "]":
      return "square";
    }
  }

  return token.type;
}

/**
 * Highlight `text`.
 */

function highlight(text: string) {
  return text.replace(jsTokens, function (...args) {
    let type = getTokenType(args);
    let colorize = defs[type];
    if (colorize) {
      return args[0].split(NEWLINE).map((str) => colorize(str)).join("\n");
    } else {
      return args[0];
    }
  });
}

/**
 * Create a code frame, adding line numbers, code highlighting, and pointing to a given position.
 */

export default function (
  rawLines: string,
  lineNumber: number,
  colNumber: ?number,
  opts: Object = {},
): string {
  colNumber = Math.max(colNumber, 0);

  let highlighted = opts.highlightCode && chalk.supportsColor;
  if (highlighted) rawLines = highlight(rawLines);

  let lines = rawLines.split(NEWLINE);
  let start = Math.max(lineNumber - 3, 0);
  let end   = Math.min(lines.length, lineNumber + 3);

  if (!lineNumber && !colNumber) {
    start = 0;
    end = lines.length;
  }

  let numberMaxWidth = String(end).length;

  let frame = lines.slice(start, end).map((line, index) => {
    let number = start + 1 + index;
    let paddedNumber = ` ${number}`.slice(-numberMaxWidth);
    let gutter = ` ${paddedNumber} | `;
    if (number === lineNumber) {
      let markerLine = "";
      if (colNumber) {
        let markerSpacing = line.slice(0, colNumber - 1).replace(/[^\t]/g, " ");
        markerLine = `\n ${gutter.replace(/\d/g, " ")}${markerSpacing}^`;
      }
      return `>${gutter}${line}${markerLine}`;
    } else {
      return ` ${gutter}${line}`;
    }
  }).join("\n");

  if (highlighted) {
    return chalk.reset(frame);
  } else {
    return frame;
  }
}
