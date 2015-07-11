import * as t from "../../../types";

var remapVisitor = {
  enter(node) {
    if (node._skipModulesRemap) {
      return this.skip();
    }
  },

  ReferencedIdentifier(node, parent, scope, remaps) {
    var { formatter } = remaps;

    var remap = remaps.get(scope, node.name);
    if (!remap || node === remap) return;

    if (!scope.hasBinding(node.name) ||
        scope.bindingIdentifierEquals(node.name, formatter.localImports[node.name])) {
      if (!formatter.isLoose() && this.key === "callee" && this.parentPath.isCallExpression()) {
        return t.sequenceExpression([t.literal(0), remap]);
      } else {
        return remap;
      }
    }
  },

  AssignmentExpression: {
    exit(node, parent, scope, { formatter }) {
      if (!node._ignoreModulesRemap) {
        var exported = formatter.getExport(node.left, scope);
        if (exported) {
          return formatter.remapExportAssignment(node, exported);
        }
      }
    }
  },

  UpdateExpression(node, parent, scope, { formatter }) {
    var exported = formatter.getExport(node.argument, scope);
    if (!exported) return;

    this.skip();

    // expand to long file assignment expression
    var assign = t.assignmentExpression(node.operator[0] + "=", node.argument, t.literal(1));

    // remap this assignment expression
    var remapped = formatter.remapExportAssignment(assign, exported);

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
};
export default class Remaps {
  constructor(file, formatter) {
    this.formatter = formatter;
    this.file      = file;
  }

  run() {
    this.file.path.traverse(remapVisitor, this);
  }

  _getKey(name) {
    return `${name}:moduleRemap`;
  }

  get(scope, name) {
    return scope.getData(this._getKey(name));
  }

  add(scope, name, val) {
    if (this.all) {
      this.all.push({
        name,
        scope,
        node: val
      });
    }

    return scope.setData(this._getKey(name), val);
  }

  remove(scope, name) {
    return scope.removeData(this._getKey(name));
  }

  /**
   * These methods are used by the system module formatter who needs access to all the remaps
   * so it can process them into it's specific setter method. We don't do this by default since
   * no other module formatters need access to this.
   */

  getAll() {
    return this.all;
  }

  clearAll() {
    if (this.all) {
      for (var remap of (this.all: Array)) {
        remap.scope.removeData(this._getKey(remap.name));
      }
    }

    this.all = [];
  }
}
