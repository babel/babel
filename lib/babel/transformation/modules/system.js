"use strict";

module.exports = SystemFormatter;

var DefaultFormatter = require("./_default");
var AMDFormatter     = require("./amd");
var util             = require("../../util");
var last             = require("lodash/array/last");
var each             = require("lodash/collection/each");
var map              = require("lodash/collection/map");
var t                = require("../../types");

function SystemFormatter(file) {
  this.exportIdentifier = file.scope.generateUidIdentifier("export");
  this.noInteropRequireExport = true;
  this.noInteropRequireImport = true;

  DefaultFormatter.apply(this, arguments);
}

util.inherits(SystemFormatter, AMDFormatter);

SystemFormatter.prototype.init = function () {};

SystemFormatter.prototype._addImportSource = function (node, exportNode) {
  node._importSource = exportNode.source && exportNode.source.value;
  return node;
};

SystemFormatter.prototype.buildExportsWildcard = function (objectIdentifier, node) {
  var leftIdentifier = this.scope.generateUidIdentifier("key");
  var valIdentifier  = t.memberExpression(objectIdentifier, leftIdentifier, true);

  var left = t.variableDeclaration("var", [
    t.variableDeclarator(leftIdentifier)
  ]);

  var right = objectIdentifier;

  var block = t.blockStatement([
    t.expressionStatement(this.buildExportCall(leftIdentifier, valIdentifier))
  ]);

  return this._addImportSource(t.forInStatement(left, right, block), node);
};

SystemFormatter.prototype.buildExportsAssignment = function (id, init, node) {
  var call = this.buildExportCall(t.literal(id.name), init, true);
  return this._addImportSource(call, node);
};

SystemFormatter.prototype.remapExportAssignment = function (node) {
  return this.buildExportCall(t.literal(node.left.name), node);
};

SystemFormatter.prototype.buildExportCall = function (id, init, isStatement) {
  var call = t.callExpression(this.exportIdentifier, [id, init]);
  if (isStatement) {
    return t.expressionStatement(call);
  } else {
    return call;
  }
};

SystemFormatter.prototype.importSpecifier = function (specifier, node, nodes) {
  AMDFormatter.prototype.importSpecifier.apply(this, arguments);
  this._addImportSource(last(nodes), node);
};

var runnerSettersVisitor = {
  enter: function (node, parent, scope, state) {
    if (node._importSource === state.source) {
      if (t.isVariableDeclaration(node)) {
        each(node.declarations, function (declar) {
          state.hoistDeclarators.push(t.variableDeclarator(declar.id));
          state.nodes.push(t.expressionStatement(
            t.assignmentExpression("=", declar.id, declar.init)
          ));
        });
      } else {
        state.nodes.push(node);
      }

      this.remove();
    }
  }
};

SystemFormatter.prototype.buildRunnerSetters = function (block, hoistDeclarators) {
  var scope = this.file.scope;

  return t.arrayExpression(map(this.ids, function (uid, source) {
    var state = {
      source:           source,
      nodes:            [],
      hoistDeclarators: hoistDeclarators
    };

    scope.traverse(block, runnerSettersVisitor, state);

    return t.functionExpression(null, [uid], t.blockStatement(state.nodes));
  }));
};

var hoistVariablesVisitor = {
  enter: function (node, parent, scope, hoistDeclarators) {
    if (t.isFunction(node)) {
      // nothing inside is accessible
      return this.skip();
    }

    if (t.isVariableDeclaration(node)) {
      if (node.kind !== "var" && !t.isProgram(parent)) { // let, const
        // can't be accessed
        return;
      }

      // ignore block hoisted nodes as these can be left in
      if (node._blockHoist) return;

      var nodes = [];

      for (var i = 0; i < node.declarations.length; i++) {
        var declar = node.declarations[i];
        hoistDeclarators.push(t.variableDeclarator(declar.id));
        if (declar.init) {
          // no initializer so we can just hoist it as-is
          var assign = t.expressionStatement(t.assignmentExpression("=", declar.id, declar.init));
          nodes.push(assign);
        }
      }

      // for (var i in test)
      // for (var i = 0;;)
      if (t.isFor(parent)) {
        if (parent.left === node) {
          return node.declarations[0].id;
        }

        if (parent.init === node) {
          return t.toSequenceExpression(nodes, scope);
        }
      }

      return nodes;
    }
  }
};

var hoistFunctionsVisitor = {
  enter: function (node, parent, scope, handlerBody) {
    if (t.isFunction(node)) this.skip();

    if (t.isFunctionDeclaration(node) || node._blockHoist) {
      handlerBody.push(node);
      this.remove();
    }
  }
};

SystemFormatter.prototype.transform = function (program) {
  var hoistDeclarators = [];
  var moduleName = this.getModuleName();
  var moduleNameLiteral = t.literal(moduleName);

  var block = t.blockStatement(program.body);

  var runner = util.template("system", {
    MODULE_NAME: moduleNameLiteral,
    MODULE_DEPENDENCIES: t.arrayExpression(this.buildDependencyLiterals()),
    EXPORT_IDENTIFIER: this.exportIdentifier,
    SETTERS: this.buildRunnerSetters(block, hoistDeclarators),
    EXECUTE: t.functionExpression(null, [], block)
  }, true);

  var handlerBody = runner.expression.arguments[2].body.body;
  if (!moduleName) runner.expression.arguments.shift();

  var returnStatement = handlerBody.pop();

  // hoist up all variable declarations
  this.file.scope.traverse(block, hoistVariablesVisitor, hoistDeclarators);

  if (hoistDeclarators.length) {
    var hoistDeclar = t.variableDeclaration("var", hoistDeclarators);
    hoistDeclar._blockHoist = true;
    handlerBody.unshift(hoistDeclar);
  }

  // hoist up function declarations for circular references
  this.file.scope.traverse(block, hoistFunctionsVisitor, handlerBody);

  handlerBody.push(returnStatement);

  program.body = [runner];
};
