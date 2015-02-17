// syntax highlighting based on https://github.com/dominictarr/ansi-highlight by the fantastic Dominic Tarr

var repeating = require("repeating");
var tokenize  = require("js-tokenizer");
var chalk     = require("chalk");

var defs = {
  string1:  "red",
  string2:  "red",
  punct:    ["white", "bold"],
  curly:    "green",
  parens:   ["blue", "bold"],
  square:   ["yellow"],
  name:     "white",
  keyword:  ["cyan"],
  number:   "magenta",
  regexp:   "magenta",
  comment1: "grey",
  comment2: "grey"
};

var highlight = function (text) {
  var colorize = function (str, col) {
    if (!col) return str;

    if (Array.isArray(col)) {
      col.forEach(function (col) {
        str = chalk[col](str);
      });
    } else {
      str = chalk[col](str);
    }
    return str;
  };

  return tokenize(text, true).map(function (str) {
    var type = tokenize.type(str);
    return colorize(str, defs[type]);
  }).join("");
};

module.exports = function (lines, lineNumber, colNumber) {
  colNumber = Math.max(colNumber, 0);

  if (chalk.supportsColor) {
    lines = highlight(lines);
  }

  lines = lines.split(/\r\n|[\n\r\u2028\u2029]/);

  var start = Math.max(lineNumber - 3, 0);
  var end   = Math.min(lines.length, lineNumber + 3);
  var width = (end + "").length;

  if (!lineNumber && !colNumber) {
    start = 0;
    end = lines.length;
  }

  return "\n" + lines.slice(start, end).map(function (line, i) {
    var curr = i + start + 1;

    var gutter = curr === lineNumber ? "> " : "  ";

    var sep = curr + repeating(" ", width + 1);
    gutter += sep + "| ";

    var str = gutter + line;

    if (colNumber && curr === lineNumber) {
      str += "\n";
      str += repeating(" ", gutter.length - 2);
      str += "|" + repeating(" ", colNumber) + "^";
    }

    return str;
  }).join("\n");
};
