import * as t from "babel-types";

export var metadata = {
  optional: true,
  group: "builtin-trailing"
};

export var visitor = {
  Program(node, parent, scope, file){
    if (file.moduleFormatter._setters){
      scope.traverse(file.moduleFormatter._setters, optimizeSettersVisitor, {
        exportFunctionIdentifier: file.moduleFormatter.exportIdentifier
      });
    }
  }
};

/**
 * Setters are optimized to avoid slow export behavior in modules that rely on deep hierarchies
 * of export-from declarations.
 * More info in https://github.com/babel/babel/pull/1722 and
 * https://github.com/ModuleLoader/es6-module-loader/issues/386.
 *
 * TODO: Ideally this would be optimized during construction of the setters, but the current
 * architecture of the module formatters make that difficult.
 */
var optimizeSettersVisitor = {
  FunctionExpression: {
    enter: (node, parent, scope, state) => {
      state.hasExports = false;
      state.exportObjectIdentifier = scope.generateUidIdentifier("exportObj");
    },
    exit: (node, parent, scope, state) => {
      if (!state.hasExports) return;

      node.body.body.unshift(t.variableDeclaration("var", [
        t.variableDeclarator(t.cloneDeep(state.exportObjectIdentifier), t.objectExpression([]))
      ]));
      node.body.body.push(t.expressionStatement(t.callExpression(
        t.cloneDeep(state.exportFunctionIdentifier), [t.cloneDeep(state.exportObjectIdentifier)])));
    }
  },
  CallExpression: (node, parent, scope, state) => {
    if (!t.isIdentifier(node.callee, {name: state.exportFunctionIdentifier.name})) return;

    state.hasExports = true;
    var memberNode = t.memberExpression(t.cloneDeep(state.exportObjectIdentifier), node.arguments[0], true);
    return t.assignmentExpression("=", memberNode, node.arguments[1]);
  }
};
