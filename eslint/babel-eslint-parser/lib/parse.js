"use strict";

const babylonToEspree = require("./babylon-to-espree");
const { parseSync: parse, tokTypes: tt, traverse } = require("@babel/core");

module.exports = function(code, options) {
  const opts = {
    sourceType: options.sourceType,
    filename: options.filePath,
    cwd: options.babelOptions.cwd,
    root: options.babelOptions.root,
    rootMode: options.babelOptions.rootMode,
    envName: options.babelOptions.envName,
    configFile: options.babelOptions.configFile,
    babelrc: options.babelOptions.babelrc,
    babelrcRoots: options.babelOptions.babelrcRoots,
    extends: options.babelOptions.extends,
    env: options.babelOptions.env,
    overrides: options.babelOptions.overrides,
    test: options.babelOptions.test,
    include: options.babelOptions.include,
    exclude: options.babelOptions.exclude,
    ignore: options.babelOptions.ignore,
    only: options.babelOptions.only,
    parserOpts: {
      allowImportExportEverywhere: options.allowImportExportEverywhere, // consistent with espree
      allowReturnOutsideFunction: true,
      allowSuperOutsideMethod: true,
      ranges: true,
      tokens: true,
      plugins: ["estree"],
    },
    caller: {
      name: "babel-eslint",
    },
  };

  let ast;
  try {
    ast = parse(code, opts);
  } catch (err) {
    if (err instanceof SyntaxError) {
      err.lineNumber = err.loc.line;
      err.column = err.loc.column;
    }

    throw err;
  }

  babylonToEspree(ast, traverse, tt, code);

  return ast;
};
