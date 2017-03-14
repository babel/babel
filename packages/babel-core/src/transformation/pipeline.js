/* global BabelFileResult, BabelFileMetadata */
import fs from "fs";

import normalizeAst from "../helpers/normalize-ast";
import Plugin from "./plugin";
import File from "./file";
import OptionManager from "./file/options/option-manager";

export function analyse(code: string, opts: Object = {}, visitor?: Object): ?BabelFileMetadata {
  opts.code = false;
  if (visitor) {
    opts.plugins = opts.plugins || [];
    opts.plugins.push(new Plugin({ visitor }));
  }
  return transform(code, opts).metadata;
}

export function transform(code: string, opts?: Object): BabelFileResult {
  opts = new OptionManager().init(opts);
  if (opts === null) return null;

  const file = new File(opts);
  return file.wrap(code, function () {
    file.addCode(code);
    file.parseCode(code);
    return file.transform();
  });
}

export function transformFromAst(ast: Object, code: string, opts: Object): BabelFileResult {
  opts = new OptionManager().init(opts);
  if (opts === null) return null;

  ast = normalizeAst(ast);

  const file = new File(opts);
  return file.wrap(code, function () {
    file.addCode(code);
    file.addAst(ast);
    return file.transform();
  });
}

export function transformFile(filename: string, opts?: Object, callback: Function) {
  if (typeof opts === "function") {
    callback = opts;
    opts = {};
  }

  opts.filename = filename;
  opts = new OptionManager().init(opts);
  if (opts === null) return callback(null, null);

  fs.readFile(filename, function (err, code) {
    let result;

    if (!err) {
      try {
        const file = new File(opts);
        result = file.wrap(code, function () {
          file.addCode(code);
          file.parseCode(code);
          return file.transform();
        });
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

export function transformFileSync(filename: string, opts?: Object = {}): string {
  opts.filename = filename;
  opts = new OptionManager().init(opts);
  if (opts === null) return null;

  const code = fs.readFileSync(filename, "utf8");
  const file = new File(opts);

  return file.wrap(code, function () {
    file.addCode(code);
    file.parseCode(code);
    return file.transform();
  });
}
