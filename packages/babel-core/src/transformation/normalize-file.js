// @flow

import fs from "fs";
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

  let inputMap = null;
  if (options.inputSourceMap !== false) {
    // If an explicit object is passed in, it overrides the processing of
    // source maps that may be in the file itself.
    if (typeof options.inputSourceMap === "object") {
      inputMap = convertSourceMap.fromObject(options.inputSourceMap);
    }

    if (!inputMap) {
      const lastComment = extractComments(INLINE_SOURCEMAP_REGEX, ast);
      if (lastComment) {
        try {
          inputMap = convertSourceMap.fromComment(lastComment);
        } catch (err) {
          debug("discarding unknown inline input sourcemap", err);
        }
      }
    }

    if (!inputMap) {
      const lastComment = extractComments(EXTERNAL_SOURCEMAP_REGEX, ast);
      if (typeof options.filename === "string" && lastComment) {
        try {
          const match = EXTERNAL_SOURCEMAP_REGEX.exec(lastComment);
          if (!match) throw new Error("Invalid source map comment format.");
          inputMap = convertSourceMap.fromJSON(
            fs.readFileSync(
              path.resolve(path.dirname(options.filename), match[1]),
              "utf8",
            ),
          );
        } catch (err) {
          debug("discarding unknown file input sourcemap", err);
        }
      } else if (lastComment) {
        debug("discarding un-loadable file input sourcemap");
      }
    }
  }

  return new File(options, {
    code,
    ast,
    inputMap,
  });
}

function parser(
  pluginPasses: PluginPasses,
  { parserOpts, highlightCode = true, filename = "unknown" }: Object,
  code: string,
) {
  try {
    const results = [];
    for (const plugins of pluginPasses) {
      for (const plugin of plugins) {
        const { parserOverride } = plugin;
        if (parserOverride) {
          const ast = parserOverride(code, parserOpts, parse);

          if (ast !== undefined) results.push(ast);
        }
      }
    }

    if (results.length === 0) {
      return parse(code, parserOpts);
    } else if (results.length === 1) {
      if (typeof results[0].then === "function") {
        throw new Error(
          `You appear to be using an async parser plugin, ` +
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
      // err.code will be changed to BABEL_PARSE_ERROR later.
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
        {
          highlightCode,
        },
      );
      if (missingPlugin) {
        err.message =
          `${filename}: ` +
          generateMissingPluginMessage(missingPlugin[0], loc, codeFrame);
      } else {
        err.message = `${filename}: ${err.message}\n\n` + codeFrame;
      }
      err.code = "BABEL_PARSE_ERROR";
    }
    throw err;
  }
}

// These regexps are copied from the convert-source-map package,
// but without // or /* at the beginning of the comment.

// eslint-disable-next-line max-len
const INLINE_SOURCEMAP_REGEX = /^[@#]\s+sourceMappingURL=data:(?:application|text)\/json;(?:charset[:=]\S+?;)?base64,(?:.*)$/;
const EXTERNAL_SOURCEMAP_REGEX = /^[@#][ \t]+sourceMappingURL=([^\s'"`]+)[ \t]*$/;

function extractCommentsFromList(regex, comments, lastComment) {
  if (comments) {
    comments = comments.filter(({ value }) => {
      if (regex.test(value)) {
        lastComment = value;
        return false;
      }
      return true;
    });
  }
  return [comments, lastComment];
}

function extractComments(regex, ast) {
  let lastComment = null;
  t.traverseFast(ast, node => {
    // $FlowIgnore destructuring with expressions is not supported
    [node.leadingComments, lastComment] = extractCommentsFromList(
      regex,
      node.leadingComments,
      lastComment,
    );
    // $FlowIgnore destructuring with expressions is not supported
    [node.innerComments, lastComment] = extractCommentsFromList(
      regex,
      node.innerComments,
      lastComment,
    );
    // $FlowIgnore destructuring with expressions is not supported
    [node.trailingComments, lastComment] = extractCommentsFromList(
      regex,
      node.trailingComments,
      lastComment,
    );
  });
  return lastComment;
}
