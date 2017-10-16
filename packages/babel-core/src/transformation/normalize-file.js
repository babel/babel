// @flow

import convertSourceMap, { typeof Converter } from "convert-source-map";
import { parse } from "babylon";
import { codeFrameColumns } from "@babel/code-frame";

const shebangRegex = /^#!.*/;

export type NormalizedFile = {
  code: string,
  ast: {},
  shebang: string | null,
  inputMap: Converter | null,
};

export default function normalizeFile(
  options: Object,
  code: string,
  ast?: {},
): NormalizedFile {
  code = `${code || ""}`;

  let shebang = null;
  let inputMap = null;
  if (options.inputSourceMap !== false) {
    inputMap = convertSourceMap.fromSource(code);
    if (inputMap) {
      code = convertSourceMap.removeComments(code);
    } else if (typeof options.inputSourceMap === "object") {
      inputMap = convertSourceMap.fromObject(options.inputSourceMap);
    }
  }

  const shebangMatch = shebangRegex.exec(code);
  if (shebangMatch) {
    shebang = shebangMatch[0];
    code = code.replace(shebangRegex, "");
  }

  if (!ast) ast = parser(options, code);

  return {
    code,
    ast,
    shebang,
    inputMap,
  };
}

function parser(options, code) {
  let parseCode = parse;

  let { parserOpts } = options;
  if (parserOpts.parser) {
    parseCode = parserOpts.parser;

    parserOpts = Object.assign({}, parserOpts, {
      parser: {
        parse(source) {
          return parse(source, parserOpts);
        },
      },
    });
  }

  try {
    return parseCode(code, parserOpts);
  } catch (err) {
    const loc = err.loc;
    if (loc) {
      err.loc = null;
      err.message =
        `${options.filename}: ${err.message}\n` +
        codeFrameColumns(
          code,
          {
            start: {
              line: loc.line,
              column: loc.column + 1,
            },
          },
          options,
        );
    }
    throw err;
  }
}
