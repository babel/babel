import * as t from "../../../types";

/**
 * [Please add a description.]
 */

var remapVisitor = {

  /**
   * [Please add a description.]
   */

  enter(node) {
    if (node._skipModulesRemap) {
      return this.skip();
    }
  },

  /**
   * [Please add a description.]
   */

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

  /**
   * [Please add a description.]
   */

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

  /**
   * [Please add a description.]
   */

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

/**
 * [Please add a description.]
 */

export default class Remaps {
  constructor(file, formatter) {
    this.formatter = formatter;
    this.file      = file;
  }

  /**
   * [Please add a description.]
   */

  run() {
    this.file.path.traverse(remapVisitor, this);
  }

  /**
   * [Please add a description.]
   */

  _getKey(name) {
    return `${name}:moduleRemap`;
  }

  /**
   * [Please add a description.]
   */

  get(scope, name) {
    return scope.getData(this._getKey(name));
  }

  /**
   * [Please add a description.]
   */

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

  /**
   * [Please add a description.]
   */

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

  /**
   * [Please add a description.]
   */

  clearAll() {
    if (this.all) {
      for (var remap of (this.all: Array)) {
        remap.scope.removeData(this._getKey(remap.name));
      }
    }

    this.all = [];
  }
}
