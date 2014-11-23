module.exports = CommonJSFormatter;

var util = require("../../util");
var t    = require("../../types");

function CommonJSFormatter(file) {
  this.file = file;
}

CommonJSFormatter.prototype.getModuleName = function () {
  var opts = this.file.opts;
  var filenameRelative = opts.filenameRelative;
  var moduleName = "";

  if (opts.moduleRoot) {
    moduleName = opts.moduleRoot + "/";
  }

  if (!opts.filenameRelative) {
    return moduleName + opts.filename.replace(/^\//, "");
  }

  if (opts.sourceRoot) {
    // remove sourceRoot from filename
    var sourceRootRegEx = new RegExp("^" + opts.sourceRoot + "\/?");
    filenameRelative = filenameRelative.replace(sourceRootRegEx, "");
  }

  // remove extension
  filenameRelative = filenameRelative.replace(/\.(.*?)$/, "");

  moduleName += filenameRelative;

  return moduleName;
};

CommonJSFormatter.prototype.import = function (node, nodes) {
  // import "foo";
  nodes.push(util.template("require", {
    //inherits: node,

    MODULE_NAME: node.source.raw
  }, true));
};

CommonJSFormatter.prototype.importSpecifier = function (specifier, node, nodes) {
  var variableName = t.getSpecifierName(specifier);

  // import foo from "foo";
  if (specifier.default) {
    specifier.id = t.identifier("default");
  }

  var templateName = "require-assign";

  // import * as bar from "foo";
  if (specifier.type !== "ImportBatchSpecifier") templateName += "-key";

  nodes.push(util.template(templateName, {
    //inherits: node.specifiers.length === 1 && node,

    VARIABLE_NAME: variableName,
    MODULE_NAME:   node.source.raw,
    KEY:           specifier.id
  }));
};

CommonJSFormatter.prototype._hoistExport = function (declar, assign) {
  if (t.isFunctionDeclaration(declar)) {
    assign._blockHoist = true;
  }

  return assign;
};

CommonJSFormatter.prototype._pushStatement = function (ref, nodes) {
  if (t.isClass(ref) || t.isFunction(ref)) {
    if (ref.id) {
      nodes.push(t.toStatement(ref));
      ref = ref.id;
    }
  }
  return ref;
};

CommonJSFormatter.prototype.export = function (node, nodes) {
  var declar = node.declaration;

  if (node.default) {
    nodes.push(util.template("exports-default", {
      //inherits: node,

      VALUE: this._pushStatement(declar, nodes)
    }, true));
  } else {
    var assign;

    if (t.isVariableDeclaration(declar)) {
      var decl = declar.declarations[0];

      if (decl.init) {
        decl.init = util.template("exports-assign", {
          //inherits: node,

          VALUE: decl.init,
          KEY:   decl.id
        });
      }

      nodes.push(declar);
    } else {
      assign = util.template("exports-assign", {
        //inherits: node,

        VALUE: declar.id,
        KEY:   declar.id
      }, true);

      nodes.push(t.toStatement(declar));
      nodes.push(assign);

      this._hoistExport(declar, assign);
    }
  }
};

CommonJSFormatter.prototype._exportSpecifier = function (getRef, specifier, node, nodes) {
  var variableName = t.getSpecifierName(specifier);

  var inherits = false;
  if (node.specifiers.length === 1) inherits = node;

  if (node.source) {
    if (t.isExportBatchSpecifier(specifier)) {
      // export * from "foo";
      nodes.push(util.template("exports-wildcard", {
        //inherits: inherits,

        OBJECT: getRef()
      }, true));
    } else {
      // export { foo } from "test";
      nodes.push(util.template("exports-assign-key", {
        //inherits: inherits,

        VARIABLE_NAME: variableName.name,
        OBJECT:        getRef(),
        KEY:           specifier.id
      }, true));
    }
  } else {
    // export { foo };
    nodes.push(util.template("exports-assign", {
      //inherits: inherits,

      VALUE: specifier.id,
      KEY:   variableName
    }, true));
  }
};

CommonJSFormatter.prototype.exportSpecifier = function (specifier, node, nodes) {
  this._exportSpecifier(function () {
    return t.callExpression(t.identifier("require"), [node.source]);
  }, specifier, node, nodes);
};
