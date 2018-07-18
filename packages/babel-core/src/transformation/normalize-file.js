// @flow

import path from "path";
import buildDebug from "debug";
import cloneDeep from "lodash/cloneDeep";
import * as t from "@babel/types";
import type { PluginPasses } from "../config";
import convertSourceMap, { typeof Converter } from "convert-source-map";
import { parse } from "@babel/parser";
import { codeFrameColumns } from "@babel/code-frame";
import File from "./file/file";
import generateMissingPluginMessage from "./util/missing-plugin-helper";

const debug = buildDebug("babel:transform:file");

export type NormalizedFile = {
  code: string,
  ast: {},
  inputMap: Converter | null,
};

export default function normalizeFile(
  pluginPasses: PluginPasses,
  options: Object,
  code: string,
  ast: ?(BabelNodeFile | BabelNodeProgram),
): File {
  code = `${code || ""}`;

  let inputMap = null;
  if (options.inputSourceMap !== false) {
    // If an explicit object is passed in, it overrides the processing of
    // source maps that may be in the file itself.
    if (typeof options.inputSourceMap === "object") {
      inputMap = convertSourceMap.fromObject(options.inputSourceMap);
    }

    if (!inputMap) {
      try {
        inputMap = convertSourceMap.fromSource(code);

        if (inputMap) {
          code = convertSourceMap.removeComments(code);
        }
      } catch (err) {
        debug("discarding unknown inline input sourcemap", err);
        code = convertSourceMap.removeComments(code);
      }
    }

    if (!inputMap) {
      if (typeof options.filename === "string") {
        try {
          inputMap = convertSourceMap.fromMapFileSource(
            code,
            path.dirname(options.filename),
          );

          if (inputMap) {
            code = convertSourceMap.removeMapFileComments(code);
          }
        } catch (err) {
          debug("discarding unknown file input sourcemap", err);
          code = convertSourceMap.removeMapFileComments(code);
        }
      } else {
        debug("discarding un-loadable file input sourcemap");
        code = convertSourceMap.removeMapFileComments(code);
      }
    }
  }

  if (ast) {
    if (ast.type === "Program") {
      ast = t.file(ast, [], []);
    } else if (ast.type !== "File") {
      throw new Error("AST root must be a Program or File node");
    }
    ast = cloneDeep(ast);
  } else {
    // The parser's AST types aren't fully compatible with the types generated
    // by the logic in babel-types.
    // $FlowFixMe
    ast = parser(pluginPasses, options, code);
  }

  return new File(options, {
    code,
    ast,
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
