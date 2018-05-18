// @flow

import * as t from "@babel/types";
import type { PluginPasses } from "../config";
import convertSourceMap, { typeof Converter } from "convert-source-map";
import { parse } from "babylon";
import { codeFrameColumns } from "@babel/code-frame";
import File from "./file/file";
import generateMissingPluginMessage from "./util/missing-plugin-helper";

const shebangRegex = /^#!.*/;

export type NormalizedFile = {
  code: string,
  ast: {},
  shebang: string | null,
  inputMap: Converter | null,
};

export default function normalizeFile(
  pluginPasses: PluginPasses,
  options: Object,
  code: string,
  ast: ?(BabelNodeFile | BabelNodeProgram),
): File {
  code = `${code || ""}`;

  let shebang = null;
  let inputMap = null;
  if (options.inputSourceMap !== false) {
    // Check if sourceMap is inline
    inputMap = convertSourceMap.fromSource(code);

    // Remove inline sourceMap from code
    if (inputMap) {
      code = convertSourceMap.removeComments(code);
    }

    // if source map is not inline check if it's an external file
    if (!inputMap) {
      try {
        inputMap = convertSourceMap.fromMapFileSource(code);
      } catch (err) {}

      // remove external sourceMappingUrl from code
      if (inputMap) {
        code = convertSourceMap.removeMapFileComments(code);
      }
    }

    // If no sourceMap is found and a user provides it use that
    if (!inputMap && typeof options.inputSourceMap === "object") {
      inputMap = convertSourceMap.fromObject(options.inputSourceMap);
    }
  }

  const shebangMatch = shebangRegex.exec(code);
  if (shebangMatch) {
    shebang = shebangMatch[0];
    code = code.replace(shebangRegex, "");
  }

  if (ast) {
    if (ast.type === "Program") {
      ast = t.file(ast, [], []);
    } else if (ast.type !== "File") {
      throw new Error("AST root must be a Program or File node");
    }
  } else {
    ast = parser(pluginPasses, options, code);
  }

  return new File(options, {
    code,
    ast,
    shebang,
    inputMap,
  });
}

function parser(pluginPasses, options, code) {
  try {
    const results = [];
    for (const plugins of pluginPasses) {
      for (const plugin of plugins) {
        const { parserOverride } = plugin;
        if (parserOverride) {
          const ast = parserOverride(code, options.parserOpts, parse);

          if (ast !== undefined) results.push(ast);
        }
      }
    }

    if (results.length === 0) {
      return parse(code, options.parserOpts);
    } else if (results.length === 1) {
      if (typeof results[0].then === "function") {
        throw new Error(
          `You appear to be using an async codegen plugin, ` +
            `which your current version of Babel does not support. ` +
            `If you're using a published plugin, you may need to upgrade ` +
            `your @babel/core version.`,
        );
      }
      return results[0];
    }
    throw new Error("More than one plugin attempted to override parsing.");
  } catch (err) {
    if (err.code === "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED") {
      err.message +=
        "\nConsider renaming the file to '.mjs', or setting sourceType:module " +
        "or sourceType:unambiguous in your Babel config for this file.";
    }

    const { loc, missingPlugin } = err;
    if (loc) {
      const codeFrame = codeFrameColumns(
        code,
        {
          start: {
            line: loc.line,
            column: loc.column + 1,
          },
        },
        options,
      );
      if (missingPlugin) {
        err.message =
          `${options.filename || "unknown"}: ` +
          generateMissingPluginMessage(missingPlugin[0], loc, codeFrame);
      } else {
        err.message =
          `${options.filename || "unknown"}: ${err.message}\n\n` + codeFrame;
      }
      err.code = "BABEL_PARSE_ERROR";
    }
    throw err;
  }
}
