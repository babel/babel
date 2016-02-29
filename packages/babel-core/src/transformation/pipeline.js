import normalizeAst from "../helpers/normalize-ast";
import Plugin from "./plugin";
import File from "./file";

export default class Pipeline {
  lint(code, opts = {}) {
    opts.code = false;
    opts.mode = "lint";
    return this.transform(code, opts);
  }

  pretransform(code, opts) {
    let file = new File(opts, this);
    return file.wrap(code, function () {
      file.addCode(code);
      file.parseCode(code);
      return file;
    });
  }

  transform(code, opts) {
    let file = new File(opts, this);
    return file.wrap(code, function () {
      file.addCode(code);
      file.parseCode(code);
      return file.transform();
    });
  }

  analyse(code, opts = {}, visitor) {
    opts.code = false;
    if (visitor) {
      opts.plugins = opts.plugins || [];
      opts.plugins.push(new Plugin({ visitor }));
    }
    return this.transform(code, opts).metadata;
  }

  transformFromAst(ast, code, opts) {
    ast = normalizeAst(ast);

    let file = new File(opts, this);
    return file.wrap(code, function () {
      file.addCode(code);
      file.addAst(ast);
      return file.transform();
    });
  }
}
