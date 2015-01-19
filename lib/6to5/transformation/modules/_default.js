"use strict";

module.exports = DefaultFormatter;

var traverse = require("../../traverse");
var util     = require("../../util");
var t        = require("../../types");
var _        = require("lodash");

function DefaultFormatter(file) {
  this.file = file;

  this.localExports = this.getLocalExports();
  this.localImports = this.getLocalImports();

  this.remapAssignments();

  //this.checkCollisions();
}

var exportsTraverser = {
  enter: function (node, parent, scope, context, localExports) {
    var declar = node && node.declaration;
    if (t.isExportDeclaration(node) && declar && t.isStatement(declar)) {
      _.extend(localExports, t.getIds(declar, true));
    }
  }
};

DefaultFormatter.prototype.getLocalExports = function () {
  var localExports = {};
  traverse(this.file.ast, exportsTraverser, null, localExports);
  return localExports;
};

var importsTraverser = {
  enter: function (node, parent, scope, context, localImports) {
    if (t.isImportDeclaration(node)) {
      _.extend(localImports, t.getIds(node, true));
    }
  }
};

DefaultFormatter.prototype.getLocalImports = function () {
  var localImports = {};
  traverse(this.file.ast, importsTraverser, null, localImports);
  return localImports;
};

var collissionsTraverser = {
  enter: function (node, parent, scope, context, check) {
    if (t.isAssignmentExpression(node)) {

      var left = node.left;
      if (t.isMemberExpression(left)) {
        while (left.object) left = left.object;
      }

      check(left);
    } else if (t.isDeclaration(node)) {
      _.each(t.getIds(node, true), check);
    }
  }
};

DefaultFormatter.prototype.checkCollisions = function () {
  // todo: all check export collissions

  var localImports = this.localImports;
  var file = this.file;

  var isLocalReference = function (node) {
    return t.isIdentifier(node) && _.has(localImports, node.name) && localImports[node.name] !== node;
  };

  var check = function (node) {
    if (isLocalReference(node)) {
      throw file.errorWithNode(node, "Illegal assignment of module import");
    }
  };

  traverse(file.ast, collissionsTraverser, null, check);
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
    var name = node.name;
    return t.isIdentifier(node) && localExports[name] && localExports[name] === scope.get(name, true);
  };

  traverse(this.file.ast, {
    enter: function (node, parent, scope, context, isLocalReference) {
      if (t.isUpdateExpression(node) && isLocalReference(node.argument, scope)) {
        context.skip();

        // expand to long file assignment expression
        var assign = t.assignmentExpression(node.operator[0] + "=", node.argument, t.literal(1));

        // remap this assignment expression
        var remapped = self.remapExportAssignment(assign);

        // we don't need to change the result
        if (t.isExpressionStatement(parent) || node.prefix) {
          return remapped;
        }

        var nodes = [];
        nodes.push(remapped);

        var operator;
        if (node.operator === "--") {
          operator = "+";
        } else { // "++"
          operator = "-";
        }
        nodes.push(t.binaryExpression(operator, node.argument, t.literal(1)));

        return t.sequenceExpression(nodes);
      }

      if (t.isAssignmentExpression(node) && isLocalReference(node.left, scope)) {
        context.skip();
        return self.remapExportAssignment(node);
      }
    }
  }, null, isLocalReference);
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

  if (!opts.keepModuleIdExtensions) {
    // remove extension
    filenameRelative = filenameRelative.replace(/\.(.*?)$/, "");
  }

  moduleName += filenameRelative;

  // normalise path separators
  moduleName = moduleName.replace(/\\/g, "/");

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

DefaultFormatter.prototype._hoistExport = function (declar, assign, priority) {
  if (t.isFunctionDeclaration(declar)) {
    assign._blockHoist = priority || 2;
  }

  return assign;
};

DefaultFormatter.prototype._exportSpecifier = function (getRef, specifier, node, nodes) {
  var inherits = false;
  if (node.specifiers.length === 1) inherits = node;

  if (node.source) {
    if (t.isExportBatchSpecifier(specifier)) {
      // export * from "foo";
      nodes.push(this._exportsWildcard(getRef(), node));
    } else {
      var ref;
      if (t.isSpecifierDefault(specifier) && !this.noInteropRequire) {
        // importing a default so we need to normalise it
        ref = t.callExpression(this.file.addHelper("interop-require"), [getRef()]);
      } else {
        ref = t.memberExpression(getRef(), specifier.id);
      }

      // export { foo } from "test";
      nodes.push(this._exportsAssign(
        t.getSpecifierName(specifier),
        ref,
        node
      ));
    }
  } else {
    // export { foo };
    nodes.push(this._exportsAssign(t.getSpecifierName(specifier), specifier.id, node));
  }
};

DefaultFormatter.prototype._exportsWildcard = function (objectIdentifier) {
  return t.expressionStatement(t.callExpression(this.file.addHelper("defaults"), [
    t.identifier("exports"),
    t.callExpression(this.file.addHelper("interop-require-wildcard"), [objectIdentifier])
  ]));
};

DefaultFormatter.prototype._exportsAssign = function (id, init) {
  return util.template("exports-assign", {
    VALUE: init,
    KEY:   id
  }, true);
};

DefaultFormatter.prototype.exportDeclaration = function (node, nodes) {
  var declar = node.declaration;

  var id = declar.id;

  if (node.default) {
    id = t.identifier("default");
  }

  var assign;

  if (t.isVariableDeclaration(declar)) {
    for (var i = 0; i < declar.declarations.length; i++) {
      var decl = declar.declarations[i];

      decl.init = this._exportsAssign(decl.id, decl.init, node).expression;

      var newDeclar = t.variableDeclaration(declar.kind, [decl]);
      if (i === 0) t.inherits(newDeclar, declar);
      nodes.push(newDeclar);
    }
  } else {
    var ref = declar;

    if (t.isFunctionDeclaration(declar) || t.isClassDeclaration(declar)) {
      ref = declar.id;
      nodes.push(declar);
    }

    assign = this._exportsAssign(id, ref, node);

    nodes.push(assign);

    this._hoistExport(declar, assign);
  }
};
