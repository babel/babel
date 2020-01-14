// @flow

import fs from "fs";
import path from "path";
import buildDebug from "debug";
import cloneDeep from "lodash/cloneDeep";
import type { Handler } from "gensync";
import * as t from "@babel/types";
import type { PluginPasses } from "../config";
import convertSourceMap, { typeof Converter } from "convert-source-map";
import File from "./file/file";
import parser from "../parser";

const debug = buildDebug("babel:transform:file");
const LARGE_INPUT_SOURCEMAP_THRESHOLD = 1_000_000;

export type NormalizedFile = {
  code: string,
  ast: {},
  inputMap: Converter | null,
};

export default function* normalizeFile(
  pluginPasses: PluginPasses,
  options: Object,
  code: string,
  ast: ?(BabelNodeFile | BabelNodeProgram),
): Handler<File> {
  code = `${code || ""}`;

  if (ast) {
    if (ast.type === "Program") {
      ast = t.file(ast, [], []);
    } else if (ast.type !== "File") {
      throw new Error("AST root must be a Program or File node");
    }
    ast = cloneDeep(ast);
  } else {
    ast = yield* parser(pluginPasses, options, code);
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
          // when `lastComment` is non-null, EXTERNAL_SOURCEMAP_REGEX must have matches
          const match: [string, string] = (EXTERNAL_SOURCEMAP_REGEX.exec(
            lastComment,
          ): any);
          const inputMapContent: Buffer = fs.readFileSync(
            path.resolve(path.dirname(options.filename), match[1]),
          );
          if (inputMapContent.length > LARGE_INPUT_SOURCEMAP_THRESHOLD) {
            debug("skip merging input map > 1 MB");
          } else {
            inputMap = convertSourceMap.fromJSON(inputMapContent);
          }
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
