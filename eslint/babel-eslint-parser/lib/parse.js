"use strict";

const babylonToEspree = require("./babylon-to-espree");
const parse = require("@babel/parser").parse;
const tt = require("@babel/parser").tokTypes;
const traverse = require("@babel/traverse").default;
const codeFrameColumns = require("@babel/code-frame").codeFrameColumns;

module.exports = function(code, options) {
  const legacyDecorators =
    options.ecmaFeatures && options.ecmaFeatures.legacyDecorators;

  const opts = {
    codeFrame: options.hasOwnProperty("codeFrame") ? options.codeFrame : true,
    sourceType: options.sourceType,
    allowImportExportEverywhere: options.allowImportExportEverywhere, // consistent with espree
    allowReturnOutsideFunction: true,
    allowSuperOutsideMethod: true,
    ranges: true,
    tokens: true,
    plugins: [
      ["flow", { all: true }],
      "jsx",
      "estree",
      "asyncFunctions",
      "asyncGenerators",
      "classConstructorCall",
      "classProperties",
      legacyDecorators
        ? "decorators-legacy"
        : ["decorators", { decoratorsBeforeExport: false }],
      "doExpressions",
      "exponentiationOperator",
      "exportDefaultFrom",
      "exportNamespaceFrom",
      "functionBind",
      "functionSent",
      "objectRestSpread",
      "trailingFunctionCommas",
      "dynamicImport",
      "numericSeparator",
      "optionalChaining",
      "importMeta",
      "classPrivateProperties",
      "bigInt",
      "optionalCatchBinding",
      "throwExpressions",
      ["pipelineOperator", { proposal: "minimal" }],
      "nullishCoalescingOperator",
      "logicalAssignment",
    ],
  };

  let ast;
  try {
    ast = parse(code, opts);
  } catch (err) {
    if (err instanceof SyntaxError) {
      err.lineNumber = err.loc.line;
      err.column = err.loc.column;

      if (opts.codeFrame) {
        err.lineNumber = err.loc.line;
        err.column = err.loc.column + 1;

        // remove trailing "(LINE:COLUMN)" acorn message and add in esprima syntax error message start
        err.message =
          "Line " +
          err.lineNumber +
          ": " +
          err.message.replace(/ \((\d+):(\d+)\)$/, "") +
          // add codeframe
          "\n\n" +
          codeFrameColumns(
            code,
            {
              start: {
                line: err.lineNumber,
                column: err.column,
              },
            },
            { highlightCode: true }
          );
      }
    }

    throw err;
  }

  babylonToEspree(ast, traverse, tt, code);

  return ast;
};
