const babel = require("./babel-core.cjs");

const normalizeBabelParseConfig = require("./configuration.cjs");
const convert = require("../convert/index.cjs");
const { getVisitorKeys, getTokLabels } = require("./ast-info.cjs");

module.exports = function parse(code, options) {
  let ast;

  try {
    ast = babel.parseSync(code, normalizeBabelParseConfig(options));
  } catch (err) {
    if (err instanceof SyntaxError) {
      err.lineNumber = err.loc.line;
      err.column = err.loc.column;
    }

    throw err;
  }

  convert(ast, code, getTokLabels(), getVisitorKeys());

  return ast;
};
