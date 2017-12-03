"use strict";

exports.__esModule = true;

var _symbol = require("babel-runtime/core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.default = function () {
  return {
    visitor: {
      VariableDeclaration: function VariableDeclaration(path, file) {
        var node = path.node,
            parent = path.parent,
            scope = path.scope;

        if (!isBlockScoped(node)) return;
        convertBlockScopedToVar(path, null, parent, scope, true);

        if (node._tdzThis) {
          var nodes = [node];

          for (var i = 0; i < node.declarations.length; i++) {
            var decl = node.declarations[i];
            if (decl.init) {
              var assign = t.assignmentExpression("=", decl.id, decl.init);
              assign._ignoreBlockScopingTDZ = true;
              nodes.push(t.expressionStatement(assign));
            }
            decl.init = file.addHelper("temporalUndefined");
          }

          node._blockHoist = 2;

          if (path.isCompletionRecord()) {
            nodes.push(t.expressionStatement(scope.buildUndefinedNode()));
          }

          path.replaceWithMultiple(nodes);
        }
      },
      Loop: function Loop(path, file) {
        var node = path.node,
            parent = path.parent,
            scope = path.scope;

        t.ensureBlock(node);
        var blockScoping = new BlockScoping(path, path.get("body"), parent, scope, file);
        var replace = blockScoping.run();
        if (replace) path.replaceWith(replace);
      },
      CatchClause: function CatchClause(path, file) {
        var parent = path.parent,
            scope = path.scope;

        var blockScoping = new BlockScoping(null, path.get("body"), parent, scope, file);
        blockScoping.run();
      },
      "BlockStatement|SwitchStatement|Program": function BlockStatementSwitchStatementProgram(path, file) {
        if (!ignoreBlock(path)) {
          var blockScoping = new BlockScoping(null, path, path.parent, path.scope, file);
          blockScoping.run();
        }
      }
    }
  };
};

var _babelTraverse = require("babel-traverse");

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

var _tdz = require("./tdz");

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var _values = require("lodash/values");

var _values2 = _interopRequireDefault(_values);

var _extend = require("lodash/extend");

var _extend2 = _interopRequireDefault(_extend);

var _babelTemplate = require("babel-template");

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ignoreBlock(path) {
  return t.isLoop(path.parent) || t.isCatchClause(path.parent);
}

var buildRetCheck = (0, _babelTemplate2.default)("\n  if (typeof RETURN === \"object\") return RETURN.v;\n");

function isBlockScoped(node) {
  if (!t.isVariableDeclaration(node)) return false;
  if (node[t.BLOCK_SCOPED_SYMBOL]) return true;
  if (node.kind !== "let" && node.kind !== "const") return false;
  return true;
}

function convertBlockScopedToVar(path, node, parent, scope) {
  var moveBindingsToParent = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  if (!node) {
    node = path.node;
  }

  if (!t.isFor(parent)) {
    for (var i = 0; i < node.declarations.length; i++) {
      var declar = node.declarations[i];
      declar.init = declar.init || scope.buildUndefinedNode();
    }
  }

  node[t.BLOCK_SCOPED_SYMBOL] = true;
  node.kind = "var";

  if (moveBindingsToParent) {
    var parentScope = scope.getFunctionParent();
    var ids = path.getBindingIdentifiers();
    for (var name in ids) {
      var binding = scope.getOwnBinding(name);
      if (binding) binding.kind = "var";
      scope.moveBindingTo(name, parentScope);
    }
  }
}

function isVar(node) {
  return t.isVariableDeclaration(node, { kind: "var" }) && !isBlockScoped(node);
}

var letReferenceBlockVisitor = _babelTraverse2.default.visitors.merge([{
  Loop: {
    enter: function enter(path, state) {
      state.loopDepth++;
    },
    exit: function exit(path, state) {
      state.loopDepth--;
    }
  },
  Function: function Function(path, state) {
    if (state.loopDepth > 0) {
      path.traverse(letReferenceFunctionVisitor, state);
    }
    return path.skip();
  }
}, _tdz.visitor]);

var letReferenceFunctionVisitor = _babelTraverse2.default.visitors.merge([{
  ReferencedIdentifier: function ReferencedIdentifier(path, state) {
    var ref = state.letReferences[path.node.name];

    if (!ref) return;

    var localBinding = path.scope.getBindingIdentifier(path.node.name);
    if (localBinding && localBinding !== ref) return;

    state.closurify = true;
  }
}, _tdz.visitor]);

var hoistVarDeclarationsVisitor = {
  enter: function enter(path, self) {
    var node = path.node,
        parent = path.parent;


    if (path.isForStatement()) {
      if (isVar(node.init, node)) {
        var nodes = self.pushDeclar(node.init);
        if (nodes.length === 1) {
          node.init = nodes[0];
        } else {
          node.init = t.sequenceExpression(nodes);
        }
      }
    } else if (path.isFor()) {
      if (isVar(node.left, node)) {
        self.pushDeclar(node.left);
        node.left = node.left.declarations[0].id;
      }
    } else if (isVar(node, parent)) {
      path.replaceWithMultiple(self.pushDeclar(node).map(function (expr) {
        return t.expressionStatement(expr);
      }));
    } else if (path.isFunction()) {
      return path.skip();
    }
  }
};

var loopLabelVisitor = {
  LabeledStatement: function LabeledStatement(_ref, state) {
    var node = _ref.node;

    state.innerLabels.push(node.label.name);
  }
};

var continuationVisitor = {
  enter: function enter(path, state) {
    if (path.isAssignmentExpression() || path.isUpdateExpression()) {
      var bindings = path.getBindingIdentifiers();
      for (var name in bindings) {
        if (state.outsideReferences[name] !== path.scope.getBindingIdentifier(name)) continue;
        state.reassignments[name] = true;
      }
    }
  }
};

function loopNodeTo(node) {
  if (t.isBreakStatement(node)) {
    return "break";
  } else if (t.isContinueStatement(node)) {
    return "continue";
  }
}

var loopVisitor = {
  Loop: function Loop(path, state) {
    var oldIgnoreLabeless = state.ignoreLabeless;
    state.ignoreLabeless = true;
    path.traverse(loopVisitor, state);
    state.ignoreLabeless = oldIgnoreLabeless;
    path.skip();
  },
  Function: function Function(path) {
    path.skip();
  },
  SwitchCase: function SwitchCase(path, state) {
    var oldInSwitchCase = state.inSwitchCase;
    state.inSwitchCase = true;
    path.traverse(loopVisitor, state);
    state.inSwitchCase = oldInSwitchCase;
    path.skip();
  },
  "BreakStatement|ContinueStatement|ReturnStatement": function BreakStatementContinueStatementReturnStatement(path, state) {
    var node = path.node,
        parent = path.parent,
        scope = path.scope;

    if (node[this.LOOP_IGNORE]) return;

    var replace = void 0;
    var loopText = loopNodeTo(node);

    if (loopText) {
      if (node.label) {
        if (state.innerLabels.indexOf(node.label.name) >= 0) {
          return;
        }

        loopText = loopText + "|" + node.label.name;
      } else {
        if (state.ignoreLabeless) return;

        if (state.inSwitchCase) return;

        if (t.isBreakStatement(node) && t.isSwitchCase(parent)) return;
      }

      state.hasBreakContinue = true;
      state.map[loopText] = node;
      replace = t.stringLiteral(loopText);
    }

    if (path.isReturnStatement()) {
      state.hasReturn = true;
      replace = t.objectExpression([t.objectProperty(t.identifier("v"), node.argument || scope.buildUndefinedNode())]);
    }

    if (replace) {
      replace = t.returnStatement(replace);
      replace[this.LOOP_IGNORE] = true;
      path.skip();
      path.replaceWith(t.inherits(replace, node));
    }
  }
};

var BlockScoping = function () {
  function BlockScoping(loopPath, blockPath, parent, scope, file) {
    (0, _classCallCheck3.default)(this, BlockScoping);

    this.parent = parent;
    this.scope = scope;
    this.file = file;

    this.blockPath = blockPath;
    this.block = blockPath.node;

    this.outsideLetReferences = (0, _create2.default)(null);
    this.hasLetReferences = false;
    this.letReferences = (0, _create2.default)(null);
    this.body = [];

    if (loopPath) {
      this.loopParent = loopPath.parent;
      this.loopLabel = t.isLabeledStatement(this.loopParent) && this.loopParent.label;
      this.loopPath = loopPath;
      this.loop = loopPath.node;
    }
  }

  BlockScoping.prototype.run = function run() {
    var block = this.block;
    if (block._letDone) return;
    block._letDone = true;

    var needsClosure = this.getLetReferences();

    if (t.isFunction(this.parent) || t.isProgram(this.block)) {
      this.updateScopeInfo();
      return;
    }

    if (!this.hasLetReferences) return;

    if (needsClosure) {
      this.wrapClosure();
    } else {
      this.remap();
    }

    this.updateScopeInfo(needsClosure);

    if (this.loopLabel && !t.isLabeledStatement(this.loopParent)) {
      return t.labeledStatement(this.loopLabel, this.loop);
    }
  };

  BlockScoping.prototype.updateScopeInfo = function updateScopeInfo(wrappedInClosure) {
    var scope = this.scope;
    var parentScope = scope.getFunctionParent();
    var letRefs = this.letReferences;

    for (var key in letRefs) {
      var ref = letRefs[key];
      var binding = scope.getBinding(ref.name);
      if (!binding) continue;
      if (binding.kind === "let" || binding.kind === "const") {
        binding.kind = "var";

        if (wrappedInClosure) {
          scope.removeBinding(ref.name);
        } else {
          scope.moveBindingTo(ref.name, parentScope);
        }
      }
    }
  };

  BlockScoping.prototype.remap = function remap() {
    var letRefs = this.letReferences;
    var scope = this.scope;

    for (var key in letRefs) {
      var ref = letRefs[key];

      if (scope.parentHasBinding(key) || scope.hasGlobal(key)) {
        if (scope.hasOwnBinding(key)) scope.rename(ref.name);

        if (this.blockPath.scope.hasOwnBinding(key)) this.blockPath.scope.rename(ref.name);
      }
    }
  };

  BlockScoping.prototype.wrapClosure = function wrapClosure() {
    if (this.file.opts.throwIfClosureRequired) {
      throw this.blockPath.buildCodeFrameError("Compiling let/const in this block would add a closure " + "(throwIfClosureRequired).");
    }
    var block = this.block;

    var outsideRefs = this.outsideLetReferences;

    if (this.loop) {
      for (var name in outsideRefs) {
        var id = outsideRefs[name];

        if (this.scope.hasGlobal(id.name) || this.scope.parentHasBinding(id.name)) {
          delete outsideRefs[id.name];
          delete this.letReferences[id.name];

          this.scope.rename(id.name);

          this.letReferences[id.name] = id;
          outsideRefs[id.name] = id;
        }
      }
    }

    this.has = this.checkLoop();

    this.hoistVarDeclarations();

    var params = (0, _values2.default)(outsideRefs);
    var args = (0, _values2.default)(outsideRefs);

    var isSwitch = this.blockPath.isSwitchStatement();

    var fn = t.functionExpression(null, params, t.blockStatement(isSwitch ? [block] : block.body));
    fn.shadow = true;

    this.addContinuations(fn);

    var ref = fn;

    if (this.loop) {
      ref = this.scope.generateUidIdentifier("loop");
      this.loopPath.insertBefore(t.variableDeclaration("var", [t.variableDeclarator(ref, fn)]));
    }

    var call = t.callExpression(ref, args);
    var ret = this.scope.generateUidIdentifier("ret");

    var hasYield = _babelTraverse2.default.hasType(fn.body, this.scope, "YieldExpression", t.FUNCTION_TYPES);
    if (hasYield) {
      fn.generator = true;
      call = t.yieldExpression(call, true);
    }

    var hasAsync = _babelTraverse2.default.hasType(fn.body, this.scope, "AwaitExpression", t.FUNCTION_TYPES);
    if (hasAsync) {
      fn.async = true;
      call = t.awaitExpression(call);
    }

    this.buildClosure(ret, call);

    if (isSwitch) this.blockPath.replaceWithMultiple(this.body);else block.body = this.body;
  };

  BlockScoping.prototype.buildClosure = function buildClosure(ret, call) {
    var has = this.has;
    if (has.hasReturn || has.hasBreakContinue) {
      this.buildHas(ret, call);
    } else {
      this.body.push(t.expressionStatement(call));
    }
  };

  BlockScoping.prototype.addContinuations = function addContinuations(fn) {
    var state = {
      reassignments: {},
      outsideReferences: this.outsideLetReferences
    };

    this.scope.traverse(fn, continuationVisitor, state);

    for (var i = 0; i < fn.params.length; i++) {
      var param = fn.params[i];
      if (!state.reassignments[param.name]) continue;

      var newParam = this.scope.generateUidIdentifier(param.name);
      fn.params[i] = newParam;

      this.scope.rename(param.name, newParam.name, fn);

      fn.body.body.push(t.expressionStatement(t.assignmentExpression("=", param, newParam)));
    }
  };

  BlockScoping.prototype.getLetReferences = function getLetReferences() {
    var _this = this;

    var block = this.block;

    var declarators = [];

    if (this.loop) {
      var init = this.loop.left || this.loop.init;
      if (isBlockScoped(init)) {
        declarators.push(init);
        (0, _extend2.default)(this.outsideLetReferences, t.getBindingIdentifiers(init));
      }
    }

    var addDeclarationsFromChild = function addDeclarationsFromChild(path, node) {
      node = node || path.node;
      if (t.isClassDeclaration(node) || t.isFunctionDeclaration(node) || isBlockScoped(node)) {
        if (isBlockScoped(node)) {
          convertBlockScopedToVar(path, node, block, _this.scope);
        }
        declarators = declarators.concat(node.declarations || node);
      }
      if (t.isLabeledStatement(node)) {
        addDeclarationsFromChild(path.get("body"), node.body);
      }
    };

    if (block.body) {
      for (var i = 0; i < block.body.length; i++) {
        var declarPath = this.blockPath.get("body")[i];
        addDeclarationsFromChild(declarPath);
      }
    }

    if (block.cases) {
      for (var _i = 0; _i < block.cases.length; _i++) {
        var consequents = block.cases[_i].consequent;

        for (var j = 0; j < consequents.length; j++) {
          var _declarPath = this.blockPath.get("cases")[_i];
          var declar = consequents[j];
          addDeclarationsFromChild(_declarPath, declar);
        }
      }
    }

    for (var _i2 = 0; _i2 < declarators.length; _i2++) {
      var _declar = declarators[_i2];

      var keys = t.getBindingIdentifiers(_declar, false, true);
      (0, _extend2.default)(this.letReferences, keys);
      this.hasLetReferences = true;
    }

    if (!this.hasLetReferences) return;

    var state = {
      letReferences: this.letReferences,
      closurify: false,
      file: this.file,
      loopDepth: 0
    };

    var loopOrFunctionParent = this.blockPath.find(function (path) {
      return path.isLoop() || path.isFunction();
    });
    if (loopOrFunctionParent && loopOrFunctionParent.isLoop()) {
      state.loopDepth++;
    }

    this.blockPath.traverse(letReferenceBlockVisitor, state);

    return state.closurify;
  };

  BlockScoping.prototype.checkLoop = function checkLoop() {
    var state = {
      hasBreakContinue: false,
      ignoreLabeless: false,
      inSwitchCase: false,
      innerLabels: [],
      hasReturn: false,
      isLoop: !!this.loop,
      map: {},
      LOOP_IGNORE: (0, _symbol2.default)()
    };

    this.blockPath.traverse(loopLabelVisitor, state);
    this.blockPath.traverse(loopVisitor, state);

    return state;
  };

  BlockScoping.prototype.hoistVarDeclarations = function hoistVarDeclarations() {
    this.blockPath.traverse(hoistVarDeclarationsVisitor, this);
  };

  BlockScoping.prototype.pushDeclar = function pushDeclar(node) {
    var declars = [];
    var names = t.getBindingIdentifiers(node);
    for (var name in names) {
      declars.push(t.variableDeclarator(names[name]));
    }

    this.body.push(t.variableDeclaration(node.kind, declars));

    var replace = [];

    for (var i = 0; i < node.declarations.length; i++) {
      var declar = node.declarations[i];
      if (!declar.init) continue;

      var expr = t.assignmentExpression("=", declar.id, declar.init);
      replace.push(t.inherits(expr, declar));
    }

    return replace;
  };

  BlockScoping.prototype.buildHas = function buildHas(ret, call) {
    var body = this.body;

    body.push(t.variableDeclaration("var", [t.variableDeclarator(ret, call)]));

    var retCheck = void 0;
    var has = this.has;
    var cases = [];

    if (has.hasReturn) {
      retCheck = buildRetCheck({
        RETURN: ret
      });
    }

    if (has.hasBreakContinue) {
      for (var key in has.map) {
        cases.push(t.switchCase(t.stringLiteral(key), [has.map[key]]));
      }

      if (has.hasReturn) {
        cases.push(t.switchCase(null, [retCheck]));
      }

      if (cases.length === 1) {
        var single = cases[0];
        body.push(t.ifStatement(t.binaryExpression("===", ret, single.test), single.consequent[0]));
      } else {
        if (this.loop) {
          for (var i = 0; i < cases.length; i++) {
            var caseConsequent = cases[i].consequent[0];
            if (t.isBreakStatement(caseConsequent) && !caseConsequent.label) {
              caseConsequent.label = this.loopLabel = this.loopLabel || this.scope.generateUidIdentifier("loop");
            }
          }
        }

        body.push(t.switchStatement(ret, cases));
      }
    } else {
      if (has.hasReturn) {
        body.push(retCheck);
      }
    }
  };

  return BlockScoping;
}();

module.exports = exports["default"];