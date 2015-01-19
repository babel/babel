"use strict";

module.exports = SystemFormatter;

var AMDFormatter = require("./amd");
var useStrict    = require("../helpers/use-strict");
var traverse     = require("../../traverse");
var util         = require("../../util");
var t            = require("../../types");
var _            = require("lodash");

function SystemFormatter(file) {
  this.exportIdentifier  = file.generateUidIdentifier("export");
  this.noInteropRequire = true;

  AMDFormatter.apply(this, arguments);
}

util.inherits(SystemFormatter, AMDFormatter);

SystemFormatter.prototype._addImportSource = function (node, exportNode) {
  node._importSource = exportNode.source && exportNode.source.value;
  return node;
};

SystemFormatter.prototype._exportsWildcard = function (objectIdentifier, node) {
  var leftIdentifier = this.file.generateUidIdentifier("key");
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

SystemFormatter.prototype._exportsAssign = function (id, init, node) {
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
  this._addImportSource(_.last(nodes), node);
};

SystemFormatter.prototype.buildRunnerSetters = function (block, hoistDeclarators) {
  return t.arrayExpression(_.map(this.ids, function (uid, source) {
    var state = {
      nodes: [],
      hoistDeclarators: hoistDeclarators
    };

    traverse(block, {
      enter: function (node, parent, scope, context, state) {
        if (node._importSource === source) {
          if (t.isVariableDeclaration(node)) {
            _.each(node.declarations, function (declar) {
              state.hoistDeclarators.push(t.variableDeclarator(declar.id));
              state.nodes.push(t.expressionStatement(
                t.assignmentExpression("=", declar.id, declar.init)
              ));
            });
          } else {
            state.nodes.push(node);
          }

          context.remove();
        }
      }
    }, null, state);

    return t.functionExpression(null, [uid], t.blockStatement(state.nodes));
  }));
};

SystemFormatter.prototype.transform = function (ast) {
  var program = ast.program;

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
  traverse(block, {
    enter: function (node, parent, scope, context, hoistDeclarators) {
      if (t.isFunction(node)) {
        // nothing inside is accessible
        return context.skip();
      }

      if (t.isVariableDeclaration(node)) {
        if (node.kind !== "var" && !t.isProgram(parent)) { // let, const
          // can't be accessed
          return;
        }

        var nodes = [];

        _.each(node.declarations, function (declar) {
          hoistDeclarators.push(t.variableDeclarator(declar.id));
          if (declar.init) {
            // no initializer so we can just hoist it as-is
            var assign = t.expressionStatement(t.assignmentExpression("=", declar.id, declar.init));
            nodes.push(assign);
          }
        });

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
  }, null, hoistDeclarators);

  if (hoistDeclarators.length) {
    var hoistDeclar = t.variableDeclaration("var", hoistDeclarators);
    hoistDeclar._blockHoist = true;
    handlerBody.unshift(hoistDeclar);
  }

  // hoist up function declarations for circular references
  traverse(block, {
    enter: function (node, parent, scope, context, handlerBody) {
      if (t.isFunction(node)) context.skip();

      if (t.isFunctionDeclaration(node) || node._blockHoist) {
        handlerBody.push(node);
        context.remove();
      }
    }
  }, null, handlerBody);

  handlerBody.push(returnStatement);

  if (useStrict.has(block)) {
    handlerBody.unshift(block.body.shift());
  }

  program.body = [runner];
};
