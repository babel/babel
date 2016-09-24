import jsTokens from "js-tokens";
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
const KEYWORDS = {
  "abstract": true,
  "await": true,
  "boolean": true,
  "break": true,
  "byte": true,
  "case": true,
  "catch": true,
  "char": true,
  "class": true,
  "const": true,
  "continue": true,
  "debugger": true,
  "default": true,
  "delete": true,
  "do": true,
  "double": true,
  "else": true,
  "enum": true,
  "export": true,
  "extends": true,
  "false": true,
  "final": true,
  "finally": true,
  "float": true,
  "for": true,
  "function": true,
  "goto": true,
  "if": true,
  "implements": true,
  "import": true,
  "in": true,
  "instanceof": true,
  "int": true,
  "interface": true,
  "let": true,
  "long": true,
  "native": true,
  "new": true,
  "null": true,
  "package": true,
  "private": true,
  "protected": true,
  "public": true,
  "return": true,
  "short": true,
  "static": true,
  "super": true,
  "switch": true,
  "synchronized": true,
  "this": true,
  "throw": true,
  "transient": true,
  "true": true,
  "try": true,
  "typeof": true,
  "var": true,
  "void": true,
  "volatile": true,
  "while": true,
  "with": true,
  "yield": true
};

function isKeyword(str) {
  return Object.prototype.hasOwnProperty.call(KEYWORDS, str);
}

/**
 * Get the type of token, specifying punctuator type.
 */

function getTokenType(match) {
  let token = jsTokens.matchToToken(match);
  if (token.type === "name" && isKeyword(token.value)) {
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

  let linesAbove = opts.linesAbove || 2;
  let linesBelow = opts.linesBelow || 3;

  let lines = rawLines.split(NEWLINE);
  let start = Math.max(lineNumber - (linesAbove + 1), 0);
  let end   = Math.min(lines.length, lineNumber + linesBelow);

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
