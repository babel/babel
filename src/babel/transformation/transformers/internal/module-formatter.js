export var metadata = {
  group: "builtin-modules"
};

export var Program = {
  exit(program, parent, scope, file) {
    // ensure that these are at the top, just like normal imports
    for (var node of (file.dynamicImports: Array)) {
      node._blockHoist = 3;
    }

    program.body = file.dynamicImports.concat(program.body);

    if (!file.transformers["es6.modules"].canTransform()) return;

    if (file.moduleFormatter.transform) {
      file.moduleFormatter.transform(program);
    }
  }
};
