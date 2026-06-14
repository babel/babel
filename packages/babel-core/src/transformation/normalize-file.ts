import type { Handler } from "gensync";
import { file } from "@babel/types";
import type * as t from "@babel/types";
import type { PluginPasses } from "../config/index.ts";
import convertSourceMap from "convert-source-map";
import type { SourceMapConverter as Converter } from "convert-source-map";
// eslint-disable-next-line import/no-unresolved, import/extensions
import readInputSourceMapFile from "#transformation/read-input-source-map-file";
import File from "./file/file.ts";
import parser from "../parser/index.ts";
import cloneDeep from "./util/clone-deep.ts";
import type { ResolvedOptions } from "../config/validation/options.ts";

// These regexps are copied from the convert-source-map package,
// but without // or /* at the beginning of the comment.

const SOURCEMAP_REGEX = /^[@#]\s+sourceMappingURL=.*$/;
const INLINE_SOURCEMAP_REGEX =
  /^[@#]\s+sourceMappingURL=data:(?:application|text)\/json;(?:charset[:=]\S+?;)?base64,.*$/;
const EXTERNAL_SOURCEMAP_REGEX =
  /^[@#][ \t]+sourceMappingURL=([^\s'"`]+)[ \t]*$/;

export type NormalizedFile = {
  code: string;
  ast: t.File;
  inputMap: Converter | null;
};

export default function* normalizeFile(
  pluginPasses: PluginPasses,
  options: ResolvedOptions,
  code: string,
  ast?: t.File | t.Program | null,
): Handler<File> {
  code = `${code || ""}`;

  if (ast) {
    if (ast.type === "Program") {
      ast = file(ast, [], []);
    } else if (ast.type !== "File") {
      throw new Error("AST root must be a Program or File node");
    }

    if (options.cloneInputAst) {
      ast = cloneDeep(ast);
    }
  } else {
    ast = yield* parser(pluginPasses, options, code);
  }

  let inputMap = null;
  if (options.sourceMaps && options.inputSourceMap !== false) {
    // If an explicit object is passed in, it overrides the processing of
    // source maps that may be in the file itself.
    if (typeof options.inputSourceMap === "object") {
      inputMap = convertSourceMap.fromObject(options.inputSourceMap);
    }

    if (!inputMap) {
      const body = ast.program.body;
      const comment = extractCommentFromList(
        body.length > 0
          ? body[body.length - 1].trailingComments
          : ast.program.innerComments,
      );

      if (comment) {
        if (INLINE_SOURCEMAP_REGEX.test(comment)) {
          try {
            inputMap = convertSourceMap.fromComment("//" + comment);
          } catch (err) {
            console.warn(
              "discarding unknown inline input sourcemap",
              options.filename,
              err,
            );
          }
        } else if (
          typeof options.filename === "string" &&
          EXTERNAL_SOURCEMAP_REGEX.test(comment)
        ) {
          try {
            // when `lastComment` is non-null, EXTERNAL_SOURCEMAP_REGEX must have matches
            const inputMapURL: string =
              EXTERNAL_SOURCEMAP_REGEX.exec(comment)![1];
            inputMap = readInputSourceMapFile(
              options.filename,
              options.root,
              inputMapURL,
            );
          } catch (err) {
            console.warn("discarding unknown file input sourcemap", err);
          }
        } else {
          console.warn("discarding un-loadable file input sourcemap");
        }
      }
    }
  }

  return new File(options, {
    code,
    ast: ast,
    inputMap,
  });
}

function extractCommentFromList(
  comments: t.Comment[] | undefined | null,
): string | null {
  if (comments == null || comments.length === 0) return null;
  for (let i = comments.length - 1; i >= 0; i--) {
    const comment = comments[i];
    if (SOURCEMAP_REGEX.test(comment.value)) {
      comments.splice(i, 1);
      return comment.value;
    }
  }
  return null;
}
