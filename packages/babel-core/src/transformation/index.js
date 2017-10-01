/* global BabelFileResult */
import fs from "fs";

import * as t from "babel-types";
import File from "./file";
import loadConfig from "../config";

export function transform(code: string, opts?: Object): BabelFileResult {
  const config = loadConfig(opts);
  if (config === null) return null;

  const file = new File(config);
  file.addCode(code);
  file.parseCode(code);
  return file.transform();
}

export function transformFromAst(
  ast: Object,
  code: string,
  opts: Object,
): BabelFileResult {
  const config = loadConfig(opts);
  if (config === null) return null;

  if (ast && ast.type === "Program") {
    ast = t.file(ast, [], []);
  } else if (!ast || ast.type !== "File") {
    throw new Error("Not a valid ast?");
  }

  const file = new File(config);
  file.addCode(code);
  file.addAst(ast);
  return file.transform();
}

export function transformFile(
  filename: string,
  opts?: Object,
  callback: Function,
) {
  if (typeof opts === "function") {
    callback = opts;
    opts = {};
  }

  opts.filename = filename;
  const config = loadConfig(opts);
  if (config === null) return callback(null, null);

  fs.readFile(filename, function(err, code) {
    let result;

    if (!err) {
      try {
        const file = new File(config);
        file.addCode(code);
        file.parseCode(code);
        result = file.transform();
      } catch (_err) {
        err = _err;
      }
    }

    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

export function transformFileSync(
  filename: string,
  opts?: Object = {},
): string {
  opts.filename = filename;
  const config = loadConfig(opts);
  if (config === null) return null;

  const code = fs.readFileSync(filename, "utf8");
  const file = new File(config);

  file.addCode(code);
  file.parseCode(code);
  return file.transform();
}
