module.exports = DefaultFormatter;

var traverse = require("../../traverse");
var util     = require("../../util");
var t        = require("../../types");
var _        = require("lodash");

function DefaultFormatter(file) {
  this.file = file;

  this.localExports = this.getLocalExports();
  this.remapAssignments();
}

DefaultFormatter.prototype.getLocalExports = function () {
  var localExports = {};

  traverse(this.file.ast, {
    enter: function (node) {
      var declar = node && node.declaration;
      if (t.isExportDeclaration(node) && declar && t.isStatement(declar)) {
        _.extend(localExports, t.getIds(declar, true));
      }
    }
  });

  return localExports;
};

DefaultFormatter.prototype.remapExportAssignment = function (node) {
  return t.assignmentExpression(
    "=",
    node.left,
    t.assignmentExpression(
      node.operator,
      t.memberExpression(t.identifier("exports"), node.left),
      node.right
    )
  );
};

DefaultFormatter.prototype.remapAssignments = function () {
  var localExports = this.localExports;
  var self = this;

  var isLocalReference = function (node, scope) {
    var left = node.left;
    var name = left.name;
    return t.isIdentifier(left) && localExports[name] && localExports[name] === scope.get(name, true);
  };

  traverse(this.file.ast, {
    enter: function (node, parent, scope) {
      if (t.isExportDeclaration(node)) return false;

      if (t.isAssignmentExpression(node) && isLocalReference(node, scope)) {
        return self.remapExportAssignment(node);
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
  var inherits = false;
  if (node.specifiers.length === 1) inherits = node;

  if (node.source) {
    if (t.isExportBatchSpecifier(specifier)) {
      // export * from "foo";
      nodes.push(this._exportsWildcard(getRef()));
    } else {
      // export { foo } from "test";
      nodes.push(this._exportsAssign(
        t.getSpecifierName(specifier),
        t.memberExpression(getRef(), specifier.id)
      ));
    }
  } else {
    // export { foo };
    nodes.push(this._exportsAssign(t.getSpecifierName(specifier), specifier.id));
  }
};

DefaultFormatter.prototype._exportsWildcard = function (objectIdentifier) {
  return util.template("exports-wildcard", {
    OBJECT: objectIdentifier
  }, true);
};

DefaultFormatter.prototype._exportsAssign = function (id, init) {
  return util.template("exports-assign", {
    VALUE: init,
    KEY:   id
  }, true);
};

DefaultFormatter.prototype.exportDeclaration = function (node, nodes) {
  var declar = node.declaration;

  if (node.default) {
    nodes.push(
      this._exportsAssign(t.identifier("default"), this._pushStatement(declar, nodes))
    );
  } else {
    var assign;

    if (t.isVariableDeclaration(declar)) {
      for (var i in declar.declarations) {
        var decl = declar.declarations[i];

        decl.init = this._exportsAssign(decl.id, decl.init).expression;

        var newDeclar = t.variableDeclaration(declar.kind, [decl]);
        if (i === "0") t.inherits(newDeclar, declar);
        nodes.push(newDeclar);
      }
    } else {
      assign = this._exportsAssign(declar.id, declar.id);

      nodes.push(t.toStatement(declar));
      nodes.push(assign);

      this._hoistExport(declar, assign);
    }
  }
};
