// AST walker module for Mozilla Parser API compatible trees

(function(exports) {
  "use strict";

  // A simple walk is one where you simply specify callbacks to be
  // called on specific nodes. The last two arguments are optional. A
  // simple use would be
  //
  //     walk.simple(myTree, {
  //         Expression: function(node) { ... }
  //     });
  //
  // to do something with all expressions. All Parser API node types
  // can be used to identify node types, as well as Expression,
  // Statement, and ScopeBody, which denote categories of nodes.
  //
  // The base argument can be used to pass a custom (recursive)
  // walker, and state can be used to give this walked an initial
  // state.
  exports.simple = function(node, visitors, base, state) {
    if (!base) base = exports;
    function c(node, st, override) {
      var type = override || node.type, found = visitors[type];
      if (found) found(node, st);
      base[type](node, st, c);
    }
    c(node, state);
  };

  // A recursive walk is one where your functions override the default
  // walkers. They can modify and replace the state parameter that's
  // threaded through the walk, and can opt how and whether to walk
  // their child nodes (by calling their third argument on these
  // nodes).
  exports.recursive = function(node, state, funcs, base) {
    var visitor = exports.make(funcs, base);
    function c(node, st, override) {
      visitor[override || node.type](node, st, c);
    }
    c(node, state);
  };

  // Used to create a custom walker. Will fill in all missing node
  // type properties with the defaults.
  exports.make = function(funcs, base) {
    if (!base) base = exports;
    var visitor = {};
    for (var type in base)
      visitor[type] = funcs.hasOwnProperty(type) ? funcs[type] : base[type];
    return visitor;
  };

  function skipThrough(node, st, c) { c(node, st); }
  function ignore(node, st, c) {}

  // Node walkers.

  exports.Program = exports.BlockStatement = function(node, st, c) {
    for (var i = 0; i < node.body.length; ++i)
      c(node.body[i], st, "Statement");
  };
  exports.Statement = skipThrough;
  exports.EmptyStatement = ignore;
  exports.ExpressionStatement = function(node, st, c) {
    c(node.expression, st, "Expression");
  };
  exports.IfStatement = function(node, st, c) {
    c(node.test, st, "Expression");
    c(node.consequent, st, "Statement");
    if (node.alternate) c(node.alternate, st, "Statement");
  };
  exports.LabeledStatement = function(node, st, c) {
    c(node.body, st, "Statement");
  };
  exports.BreakStatement = exports.ContinueStatement = ignore;
  exports.WithStatement = function(node, st, c) {
    c(node.object, st, "Expression");
    c(node.body, st, "Statement");
  };
  exports.SwitchStatement = function(node, st, c) {
    c(node.discriminant, st, "Expression");
    for (var i = 0; i < node.cases.length; ++i) {
      var cs = node.cases[i];
      if (cs.test) c(cs.test, st, "Expression");
      for (var j = 0; j < cs.consequent.length; ++j)
        c(cs.consequent[j], st, "Statement");
    }
  };
  exports.ReturnStatement = function(node, st, c) {
    if (node.argument) c(node.argument, st, "Expression");
  };
  exports.ThrowStatement = function(node, st, c) {
    c(node.argument, st, "Expression");
  };
  exports.TryStatement = function(node, st, c) {
    c(node.block, st, "Statement");
    for (var i = 0; i < node.handlers.length; ++i)
      c(node.handlers[i].body, st, "ScopeBody");
    if (node.finalizer) c(node.finalizer, st, "Statement");
  };
  exports.WhileStatement = function(node, st, c) {
    c(node.test, st, "Expression");
    c(node.body, st, "Statement");
  };
  exports.DoWhileStatement = exports.WhileStatement;
  exports.ForStatement = function(node, st, c) {
    if (node.init) c(node.init, st, "ForInit");
    if (node.test) c(node.test, st, "Expression");
    if (node.update) c(node.update, st, "Expression");
    c(node.body, st, "Statement");
  };
  exports.ForInStatement = function(node, st, c) {
    c(node.left, st, "ForInit");
    c(node.right, st, "Expression");
    c(node.body, st, "Statement");
  };
  exports.ForInit = function(node, st, c) {
    if (node.type == "VariableDeclaration") c(node, st);
    else c(node, st, "Expression");
  };
  exports.DebuggerStatement = ignore;

  exports.FunctionDeclaration = function(node, st, c) {
    c(node, st, "Function");
  };
  exports.VariableDeclaration = function(node, st, c) {
    for (var i = 0; i < node.declarations.length; ++i) {
      var decl = node.declarations[i];
      if (decl.init) c(decl.init, st, "Expression");
    }
  };

  exports.Function = function(node, st, c) {
    c(node.body, st, "ScopeBody");
  };
  exports.ScopeBody = function(node, st, c) {
    c(node, st, "Statement");
  };

  exports.Expression = skipThrough;
  exports.ThisExpression = ignore;
  exports.ArrayExpression = function(node, st, c) {
    for (var i = 0; i < node.elements.length; ++i) {
      var elt = node.elements[i];
      if (elt) c(elt, st, "Expression");
    }
  };
  exports.ObjectExpression = function(node, st, c) {
    for (var i = 0; i < node.properties.length; ++i)
      c(node.properties[i].value, st, "Expression");
  };
  exports.FunctionExpression = exports.FunctionDeclaration;
  exports.SequenceExpression = function(node, st, c) {
    for (var i = 0; i < node.expressions.length; ++i)
      c(node.expressions[i], st, "Expression");
  };
  exports.UnaryExpression = exports.UpdateExpression = function(node, st, c) {
    c(node.argument, st, "Expression");
  };
  exports.BinaryExpression = exports.AssignmentExpression = exports.LogicalExpression = function(node, st, c) {
    c(node.left, st, "Expression");
    c(node.right, st, "Expression");
  };
  exports.ConditionalExpression = function(node, st, c) {
    c(node.test, st, "Expression");
    c(node.consequent, st, "Expression");
    c(node.alternate, st, "Expression");
  };
  exports.NewExpression = exports.CallExpression = function(node, st, c) {
    c(node.callee, st, "Expression");
    if (node.arguments) for (var i = 0; i < node.arguments.length; ++i)
      c(node.arguments[i], st, "Expression");
  };
  exports.MemberExpression = function(node, st, c) {
    c(node.object, st, "Expression");
    if (node.computed) c(node.property, st, "Expression");
  };
  exports.Identifier = exports.Literal = ignore;

  // A custom walker that keeps track of the scope chain and the
  // variables defined in it.
  function makeScope(prev) {
    return {vars: Object.create(null), prev: prev};
  }
  exports.scopeVisitor = exports.make({
    Function: function(node, scope, c) {
      var inner = makeScope(scope);
      for (var i = 0; i < node.params.length; ++i)
        inner.vars[node.params[i].name] = {type: "argument", node: node.params[i]};
      if (node.id) {
        var decl = node.type == "FunctionDeclaration";
        (decl ? scope : inner).vars[node.id.name] =
          {type: decl ? "function" : "function name", node: node.id};
      }
      c(node.body, inner, "ScopeBody");
    },
    TryStatement: function(node, scope, c) {
      c(node.block, scope, "Statement");
      for (var i = 0; i < node.handlers.length; ++i) {
        var handler = node.handlers[i], inner = makeScope(scope);
        inner.vars[handler.param.name] = {type: "catch clause", node: handler.param};
        c(handler.body, inner, "ScopeBody");
      }
      if (node.finalizer) c(node.finalizer, scope, "Statement");
    },
    VariableDeclaration: function(node, scope, c) {
      for (var i = 0; i < node.declarations.length; ++i) {
        var decl = node.declarations[i];
        scope.vars[decl.id.name] = {type: "var", node: decl.id};
        if (decl.init) c(decl.init, scope, "Expression");
      }
    }
  });

})(typeof exports == "undefined" ? acorn.walk = {} : exports);
