const babel = require("./babel-core.cjs");
const normalizeBabelParseConfig = require("./configuration.cjs");
const convert = require("../convert/index.cjs");
const { getVisitorKeys, getTokLabels } = require("./ast-info.cjs");
const extractParserOptionsPlugin = require("./extract-parser-options-plugin.cjs");

const ref = {};
let extractParserOptionsConfigItem;

const MULTIPLE_OVERRIDES = /More than one plugin attempted to override parsing/;

module.exports = function maybeParse(code, options) {
  const resolvedOptions = normalizeBabelParseConfig(options);

  if (!extractParserOptionsConfigItem) {
    extractParserOptionsConfigItem = babel.createConfigItem(
      [extractParserOptionsPlugin, ref],
      { dirname: __dirname, type: "plugin" }
    );
  }
  resolvedOptions.plugins.push(extractParserOptionsConfigItem);

  try {
    return {
      parserOptions: babel.parseSync(code, resolvedOptions),
      ast: null,
    };
  } catch (err) {
    if (!MULTIPLE_OVERRIDES.test(err.message)) {
      throw err;
    }
  }

  let ast;

  try {
    ast = babel.parseSync(code, resolvedOptions);
  } catch (err) {
    throw convert.error(err);
  }

  return {
    ast: convert.ast(ast, code, getTokLabels(), getVisitorKeys()),
    parserOptions: null,
  };
};
