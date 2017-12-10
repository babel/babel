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
    const { loc, missingPlugin } = err;
    if (loc) {
      err.loc = null;
      err.message =
        `${options.filename || "unknown"}: ${err.message}\n` +
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
      const missingPluginMessage = generateMissingPluginMessage(missingPlugin);
      if (missingPluginMessage) {
        err.message += `\n${missingPluginMessage}`;
      }
    }
    throw err;
  }
}
