import normalizeAst from "../helpers/normalize-ast";
import File from "./file";

export default class Pipeline {
  lint(code: string, opts?: Object = {}) {
    opts.code = false;
    opts.mode = "lint";
    return this.transform(code, opts);
  }

  pretransform(code: string, opts?: Object) {
    var file = new File(opts, this);
    return file.wrap(code, function () {
      file.addCode(code);
      file.parseCode(code);
      return file;
    });
  }

  transform(code: string, opts?: Object) {
    var file = new File(opts, this);
    return file.wrap(code, function () {
      file.addCode(code);
      file.parseCode(code);
      return file.transform();
    });
  }

  transformFromAst(ast, code, opts) {
    ast = normalizeAst(ast);

    var file = new File(opts, this);
    return file.wrap(code, function () {
      file.addCode(code);
      file.addAst(ast);
      return file.transform();
    });
  }
}
