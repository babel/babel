module.exports = DefaultFormatter;

var traverse = require("../../traverse");
var util     = require("../../util");
var t        = require("../../types");

function DefaultFormatter(file) {
  this.exports = [];
  this.file    = file;

  var localExports = [];
  traverse(file.ast, function (node) {
    var declar = node && node.declaration;
    if (t.isExportDeclaration(node) && declar && t.isStatement(declar)) {
      localExports = localExports.concat(t.getIds(declar));
    }
  });
  this.localExports = localExports;

  this.remapAssignments();
}

DefaultFormatter.prototype.remapAssignments = function () {
  var localExports = this.localExports;

  traverse(this.file.ast, function (node) {
    if (t.isExportDeclaration(node)) return false;

    if (t.isAssignmentExpression(node)) {
      var left = node.left;
      if (t.isIdentifier(left) && localExports.indexOf(left.name) >= 0) {
        return t.assignmentExpression(
          "=",
          left,
          t.assignmentExpression(
            node.operator,
            t.memberExpression(t.identifier("exports"), left),
            node.right
          )
        );
      }
    }
  });
};

DefaultFormatter.prototype.getModuleName = function () {
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

DefaultFormatter.prototype._pushStatement = function (ref, nodes) {
  if (t.isClass(ref) || t.isFunction(ref)) {
    if (ref.id) {
      nodes.push(t.toStatement(ref));
      ref = ref.id;
    }
  }

  return ref;
};

DefaultFormatter.prototype._hoistExport = function (declar, assign) {
  if (t.isFunctionDeclaration(declar)) {
    assign._blockHoist = true;
  }

  return assign;
};

DefaultFormatter.prototype._exportSpecifier = function (getRef, specifier, node, nodes) {
  var variableName = t.getSpecifierName(specifier);

  var inherits = false;
  if (node.specifiers.length === 1) inherits = node;

  if (node.source) {
    if (t.isExportBatchSpecifier(specifier)) {
      // export * from "foo";
      nodes.push(util.template("exports-wildcard", {
        OBJECT: getRef()
      }, true));
    } else {
      // export { foo } from "test";
      nodes.push(util.template("exports-assign-key", {
        VARIABLE_NAME: variableName,
        OBJECT:        getRef(),
        KEY:           specifier.id
      }, true));
    }
  } else {
    // export { foo };
    nodes.push(util.template("exports-assign", {
      VALUE: specifier.id,
      KEY:   variableName
    }, true));
  }
};

DefaultFormatter.prototype.exportDeclaration = function (node, nodes) {
  var declar = node.declaration;

  if (node.default) {
    nodes.push(util.template("exports-default", {
      VALUE: this._pushStatement(declar, nodes)
    }, true));
  } else {
    var assign;

    if (t.isVariableDeclaration(declar)) {
      for (var i in declar.declarations) {
        var decl = declar.declarations[i];

        decl.init = util.template("exports-assign", {
          VALUE: decl.init,
          KEY:   decl.id
        });

        var newDeclar = t.variableDeclaration(declar.kind, [decl]);
        if (i === 0) t.inherits(newDeclar, declar);
        nodes.push(newDeclar);
      }
    } else {
      assign = util.template("exports-assign", {
        VALUE: declar.id,
        KEY:   declar.id
      }, true);

      nodes.push(t.toStatement(declar));
      nodes.push(assign);

      this._hoistExport(declar, assign);
    }
  }
};
