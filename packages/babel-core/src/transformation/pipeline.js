/* global BabelFileResult, BabelFileMetadata */
import normalizeAst from "../helpers/normalize-ast";
import Plugin from "./plugin";
import File from "./file";

export function analyse(code: string, opts: Object = {}, visitor?: Object): ?BabelFileMetadata {
  opts.code = false;
  if (visitor) {
    opts.plugins = opts.plugins || [];
    opts.plugins.push(new Plugin({ visitor }));
  }
  return transform(code, opts).metadata;
}

export function transform(code: string, opts?: Object): BabelFileResult {
  const file = new File(opts);
  return file.wrap(code, function () {
    file.addCode(code);
    file.parseCode(code);
    return file.transform();
  });
}

export function transformFromAst(ast: Object, code: string, opts: Object): BabelFileResult {
  ast = normalizeAst(ast);

  const file = new File(opts);
  return file.wrap(code, function () {
    file.addCode(code);
    file.addAst(ast);
    return file.transform();
  });
}
