import lineNumbers from "line-numbers";
import repeating from "repeating";
import jsTokens from "js-tokens";
import esutils from "esutils";
import chalk from "chalk";
import ary from "lodash/function/ary";

var defs = {
  string:      chalk.red,
  punctuation: chalk.white.bold,
  operator:    chalk.white.bold,
  curly:       chalk.green,
  parens:      chalk.blue.bold,
  square:      chalk.yellow,
  name:        chalk.white,
  keyword:     chalk.cyan,
  number:      chalk.magenta,
  regex:       chalk.magenta,
  comment:     chalk.grey,
  invalid:     chalk.inverse
};

var newline = /\r\n|[\n\r\u2028\u2029]/;

var highlight = function (text) {
  var tokenType = function (match) {
    var token = jsTokens.matchToToken(match);
    if (token.type === "name" && esutils.keyword.isKeywordES6(token.value)) {
      return "keyword";
    }

    if (token.type === "punctuation") {
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
  };

  return text.replace(jsTokens, function (match) {
    var type = tokenType(arguments);
    if (type in defs) {
      var colorize = ary(defs[type], 1);
      return match.split(newline).map(colorize).join("\n");
    }
    return match;
  });
};

module.exports = function (lines, lineNumber, colNumber) {
  colNumber = Math.max(colNumber, 0);

  if (chalk.supportsColor) {
    lines = highlight(lines);
  }

  lines = lines.split(newline);

  var start = Math.max(lineNumber - 3, 0);
  var end   = Math.min(lines.length, lineNumber + 3);

  if (!lineNumber && !colNumber) {
    start = 0;
    end = lines.length;
  }

  return "\n" + lineNumbers(lines.slice(start, end), {
    start: start + 1,
    before: "  ",
    after: " | ",
    transform(params) {
      if (params.number !== lineNumber) {
        return;
      }
      if (colNumber) {
        params.line += "\n" + params.before + repeating(" ", params.width) +
                       params.after + repeating(" ", colNumber - 1) + "^";
      }
      params.before = params.before.replace(/^./, ">");
    }
  }).join("\n");
};
