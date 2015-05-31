import DefaultFormatter from "./_default";
import AMDFormatter from "./amd";
import object from  "../../helpers/object";
import * as util from  "../../util";
import last from "lodash/array/last";
import map from "lodash/collection/map";
import * as t from "../../types";

var hoistVariablesVisitor = {
  Function() {
    // nothing inside is accessible
    this.skip();
  },

  VariableDeclaration(node, parent, scope, state) {
    if (node.kind !== "var" && !t.isProgram(parent)) { // let, const
      // can't be accessed
      return;
    }

    // ignore block hoisted nodes as these can be left in
    if (state.formatter._canHoist(node)) return;

    var nodes = [];

    for (var i = 0; i < node.declarations.length; i++) {
      var declar = node.declarations[i];
      state.hoistDeclarators.push(t.variableDeclarator(declar.id));
      if (declar.init) {
        // no initializer so we can just hoist it as-is
        var assign = t.expressionStatement(t.assignmentExpression("=", declar.id, declar.init));
        nodes.push(assign);
      }
    }

    // for (var i in test)
    // for (var i = 0;;)
    if (t.isFor(parent) && (parent.left === node || parent.init === node)) {
      return node.declarations[0].id;
    }

    return nodes;
  }
};

var hoistFunctionsVisitor = {
  Function() {
    this.skip();
  },

  enter(node, parent, scope, state) {
    if (t.isFunctionDeclaration(node) || state.formatter._canHoist(node)) {
      state.handlerBody.push(node);
      this.dangerouslyRemove();
    }
  }
};

var runnerSettersVisitor = {
  enter(node, parent, scope, state) {
    if (node._importSource === state.source) {
      if (t.isVariableDeclaration(node)) {
        for (var declar of (node.declarations: Array)) {
          state.hoistDeclarators.push(t.variableDeclarator(declar.id));
          state.nodes.push(t.expressionStatement(
            t.assignmentExpression("=", declar.id, declar.init)
          ));
        }
      } else {
        state.nodes.push(node);
      }

      this.dangerouslyRemove();
    }
  }
};

export default class SystemFormatter extends AMDFormatter {
  constructor(file) {
    super(file);

    this.exportIdentifier = file.scope.generateUidIdentifier("export");
    this.noInteropRequireExport = true;
    this.noInteropRequireImport = true;
  }

  _addImportSource(node, exportNode) {
    if (node) node._importSource = exportNode.source && exportNode.source.value;
    return node;
  }

  buildExportsWildcard(objectIdentifier, node) {
    var leftIdentifier = this.scope.generateUidIdentifier("key");
    var valIdentifier  = t.memberExpression(objectIdentifier, leftIdentifier, true);

    var left = t.variableDeclaration("var", [
      t.variableDeclarator(leftIdentifier)
    ]);

    var right = objectIdentifier;

    var block = t.blockStatement([
      t.expressionStatement(this._buildExportCall(leftIdentifier, valIdentifier))
    ]);

    return this._addImportSource(t.forInStatement(left, right, block), node);
  }

  buildExportsAssignment(id, init, node) {
    var call = this._buildExportCall(t.literal(id.name), init, true);
    return this._addImportSource(call, node);
  }

  buildExportsFromAssignment() {
    return this.buildExportsAssignment(...arguments);
  }

  remapExportAssignment(node, exported) {
    var assign = node;

    for (var i = 0; i < exported.length; i++) {
      assign = this._buildExportCall(t.literal(exported[i].name), assign);
    }

    return assign;
  }

  _buildExportCall(id, init, isStatement) {
    var call = t.callExpression(this.exportIdentifier, [id, init]);
    if (isStatement) {
      return t.expressionStatement(call);
    } else {
      return call;
    }
  }

  importSpecifier(specifier, node, nodes) {
    AMDFormatter.prototype.importSpecifier.apply(this, arguments);

    for (var name in this.internalRemap) {
      nodes.push(t.variableDeclaration("var", [
        t.variableDeclarator(t.identifier(name), this.internalRemap[name])
      ]));
    }

    this.internalRemap = object();

    this._addImportSource(last(nodes), node);
  }

  _buildRunnerSetters(block, hoistDeclarators) {
    var scope = this.file.scope;

    return t.arrayExpression(map(this.ids, function (uid, source) {
      var state = {
        hoistDeclarators: hoistDeclarators,
        source:           source,
        nodes:            []
      };

      scope.traverse(block, runnerSettersVisitor, state);

      return t.functionExpression(null, [uid], t.blockStatement(state.nodes));
    }));
  }

  _canHoist(node) {
    return node._blockHoist && !this.file.dynamicImports.length;
  }

  transform(program) {
    DefaultFormatter.prototype.transform.apply(this, arguments);

    var hoistDeclarators = [];
    var moduleName = this.getModuleName();
    var moduleNameLiteral = t.literal(moduleName);

    var block = t.blockStatement(program.body);

    var runner = util.template("system", {
      MODULE_DEPENDENCIES: t.arrayExpression(this.buildDependencyLiterals()),
      EXPORT_IDENTIFIER:   this.exportIdentifier,
      MODULE_NAME:         moduleNameLiteral,
      SETTERS:             this._buildRunnerSetters(block, hoistDeclarators),
      EXECUTE:             t.functionExpression(null, [], block)
    }, true);

    var handlerBody = runner.expression.arguments[2].body.body;
    if (!moduleName) runner.expression.arguments.shift();

    var returnStatement = handlerBody.pop();

    // hoist up all variable declarations
    this.file.scope.traverse(block, hoistVariablesVisitor, {
      formatter: this,
      hoistDeclarators: hoistDeclarators
    });

    if (hoistDeclarators.length) {
      var hoistDeclar = t.variableDeclaration("var", hoistDeclarators);
      hoistDeclar._blockHoist = true;
      handlerBody.unshift(hoistDeclar);
    }

    // hoist up function declarations for circular references
    this.file.scope.traverse(block, hoistFunctionsVisitor, {
      formatter: this,
      handlerBody: handlerBody
    });

    handlerBody.push(returnStatement);

    program.body = [runner];
  }
}
