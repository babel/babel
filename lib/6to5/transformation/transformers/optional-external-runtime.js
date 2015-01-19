exports.optional = true;

// In theory, it would be more appropriate to do this in `manipulateOptions`,
// but we need an identifier for the import and we can't get that before the
// AST is built.
exports.ast = {
  enter: function (ast, file) {
    file.opts.runtime = file.addImport(file.opts.runtime, "to5Runtime").name;
  }
};
