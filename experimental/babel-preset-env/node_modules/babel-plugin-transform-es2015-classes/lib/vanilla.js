"use strict";

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _babelTraverse = require("babel-traverse");

var _babelHelperReplaceSupers = require("babel-helper-replace-supers");

var _babelHelperReplaceSupers2 = _interopRequireDefault(_babelHelperReplaceSupers);

var _babelHelperOptimiseCallExpression = require("babel-helper-optimise-call-expression");

var _babelHelperOptimiseCallExpression2 = _interopRequireDefault(_babelHelperOptimiseCallExpression);

var _babelHelperDefineMap = require("babel-helper-define-map");

var defineMap = _interopRequireWildcard(_babelHelperDefineMap);

var _babelTemplate = require("babel-template");

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildDerivedConstructor = (0, _babelTemplate2.default)("\n  (function () {\n    super(...arguments);\n  })\n");

var noMethodVisitor = {
  "FunctionExpression|FunctionDeclaration": function FunctionExpressionFunctionDeclaration(path) {
    if (!path.is("shadow")) {
      path.skip();
    }
  },
  Method: function Method(path) {
    path.skip();
  }
};

var verifyConstructorVisitor = _babelTraverse.visitors.merge([noMethodVisitor, {
  Super: function Super(path) {
    if (this.isDerived && !this.hasBareSuper && !path.parentPath.isCallExpression({ callee: path.node })) {
      throw path.buildCodeFrameError("'super.*' is not allowed before super()");
    }
  },


  CallExpression: {
    exit: function exit(path) {
      if (path.get("callee").isSuper()) {
        this.hasBareSuper = true;

        if (!this.isDerived) {
          throw path.buildCodeFrameError("super() is only allowed in a derived constructor");
        }
      }
    }
  },

  ThisExpression: function ThisExpression(path) {
    if (this.isDerived && !this.hasBareSuper) {
      if (!path.inShadow("this")) {
        throw path.buildCodeFrameError("'this' is not allowed before super()");
      }
    }
  }
}]);

var findThisesVisitor = _babelTraverse.visitors.merge([noMethodVisitor, {
  ThisExpression: function ThisExpression(path) {
    this.superThises.push(path);
  }
}]);

var ClassTransformer = function () {
  function ClassTransformer(path, file) {
    (0, _classCallCheck3.default)(this, ClassTransformer);

    this.parent = path.parent;
    this.scope = path.scope;
    this.node = path.node;
    this.path = path;
    this.file = file;

    this.clearDescriptors();

    this.instancePropBody = [];
    this.instancePropRefs = {};
    this.staticPropBody = [];
    this.body = [];

    this.bareSuperAfter = [];
    this.bareSupers = [];

    this.pushedConstructor = false;
    this.pushedInherits = false;
    this.isLoose = false;

    this.superThises = [];

    this.classId = this.node.id;

    this.classRef = this.node.id ? t.identifier(this.node.id.name) : this.scope.generateUidIdentifier("class");

    this.superName = this.node.superClass || t.identifier("Function");
    this.isDerived = !!this.node.superClass;
  }

  ClassTransformer.prototype.run = function run() {
    var _this = this;

    var superName = this.superName;
    var file = this.file;
    var body = this.body;

    var constructorBody = this.constructorBody = t.blockStatement([]);
    this.constructor = this.buildConstructor();

    var closureParams = [];
    var closureArgs = [];

    if (this.isDerived) {
      closureArgs.push(superName);

      superName = this.scope.generateUidIdentifierBasedOnNode(superName);
      closureParams.push(superName);

      this.superName = superName;
    }

    this.buildBody();

    constructorBody.body.unshift(t.expressionStatement(t.callExpression(file.addHelper("classCallCheck"), [t.thisExpression(), this.classRef])));

    body = body.concat(this.staticPropBody.map(function (fn) {
      return fn(_this.classRef);
    }));

    if (this.classId) {
      if (body.length === 1) return t.toExpression(body[0]);
    }

    body.push(t.returnStatement(this.classRef));

    var container = t.functionExpression(null, closureParams, t.blockStatement(body));
    container.shadow = true;
    return t.callExpression(container, closureArgs);
  };

  ClassTransformer.prototype.buildConstructor = function buildConstructor() {
    var func = t.functionDeclaration(this.classRef, [], this.constructorBody);
    t.inherits(func, this.node);
    return func;
  };

  ClassTransformer.prototype.pushToMap = function pushToMap(node, enumerable) {
    var kind = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "value";
    var scope = arguments[3];

    var mutatorMap = void 0;
    if (node.static) {
      this.hasStaticDescriptors = true;
      mutatorMap = this.staticMutatorMap;
    } else {
      this.hasInstanceDescriptors = true;
      mutatorMap = this.instanceMutatorMap;
    }

    var map = defineMap.push(mutatorMap, node, kind, this.file, scope);

    if (enumerable) {
      map.enumerable = t.booleanLiteral(true);
    }

    return map;
  };

  ClassTransformer.prototype.constructorMeMaybe = function constructorMeMaybe() {
    var hasConstructor = false;
    var paths = this.path.get("body.body");
    for (var _iterator = paths, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var path = _ref;

      hasConstructor = path.equals("kind", "constructor");
      if (hasConstructor) break;
    }
    if (hasConstructor) return;

    var params = void 0,
        body = void 0;

    if (this.isDerived) {
      var _constructor = buildDerivedConstructor().expression;
      params = _constructor.params;
      body = _constructor.body;
    } else {
      params = [];
      body = t.blockStatement([]);
    }

    this.path.get("body").unshiftContainer("body", t.classMethod("constructor", t.identifier("constructor"), params, body));
  };

  ClassTransformer.prototype.buildBody = function buildBody() {
    this.constructorMeMaybe();
    this.pushBody();
    this.verifyConstructor();

    if (this.userConstructor) {
      var constructorBody = this.constructorBody;
      constructorBody.body = constructorBody.body.concat(this.userConstructor.body.body);
      t.inherits(this.constructor, this.userConstructor);
      t.inherits(constructorBody, this.userConstructor.body);
    }

    this.pushDescriptors();
  };

  ClassTransformer.prototype.pushBody = function pushBody() {
    var classBodyPaths = this.path.get("body.body");

    for (var _iterator2 = classBodyPaths, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var path = _ref2;

      var node = path.node;

      if (path.isClassProperty()) {
        throw path.buildCodeFrameError("Missing class properties transform.");
      }

      if (node.decorators) {
        throw path.buildCodeFrameError("Method has decorators, put the decorator plugin before the classes one.");
      }

      if (t.isClassMethod(node)) {
        var isConstructor = node.kind === "constructor";

        if (isConstructor) {
          path.traverse(verifyConstructorVisitor, this);

          if (!this.hasBareSuper && this.isDerived) {
            throw path.buildCodeFrameError("missing super() call in constructor");
          }
        }

        var replaceSupers = new _babelHelperReplaceSupers2.default({
          forceSuperMemoisation: isConstructor,
          methodPath: path,
          methodNode: node,
          objectRef: this.classRef,
          superRef: this.superName,
          isStatic: node.static,
          isLoose: this.isLoose,
          scope: this.scope,
          file: this.file
        }, true);

        replaceSupers.replace();

        if (isConstructor) {
          this.pushConstructor(replaceSupers, node, path);
        } else {
          this.pushMethod(node, path);
        }
      }
    }
  };

  ClassTransformer.prototype.clearDescriptors = function clearDescriptors() {
    this.hasInstanceDescriptors = false;
    this.hasStaticDescriptors = false;

    this.instanceMutatorMap = {};
    this.staticMutatorMap = {};
  };

  ClassTransformer.prototype.pushDescriptors = function pushDescriptors() {
    this.pushInherits();

    var body = this.body;

    var instanceProps = void 0;
    var staticProps = void 0;

    if (this.hasInstanceDescriptors) {
      instanceProps = defineMap.toClassObject(this.instanceMutatorMap);
    }

    if (this.hasStaticDescriptors) {
      staticProps = defineMap.toClassObject(this.staticMutatorMap);
    }

    if (instanceProps || staticProps) {
      if (instanceProps) instanceProps = defineMap.toComputedObjectFromClass(instanceProps);
      if (staticProps) staticProps = defineMap.toComputedObjectFromClass(staticProps);

      var nullNode = t.nullLiteral();

      var args = [this.classRef, nullNode, nullNode, nullNode, nullNode];

      if (instanceProps) args[1] = instanceProps;
      if (staticProps) args[2] = staticProps;

      if (this.instanceInitializersId) {
        args[3] = this.instanceInitializersId;
        body.unshift(this.buildObjectAssignment(this.instanceInitializersId));
      }

      if (this.staticInitializersId) {
        args[4] = this.staticInitializersId;
        body.unshift(this.buildObjectAssignment(this.staticInitializersId));
      }

      var lastNonNullIndex = 0;
      for (var i = 0; i < args.length; i++) {
        if (args[i] !== nullNode) lastNonNullIndex = i;
      }
      args = args.slice(0, lastNonNullIndex + 1);

      body.push(t.expressionStatement(t.callExpression(this.file.addHelper("createClass"), args)));
    }

    this.clearDescriptors();
  };

  ClassTransformer.prototype.buildObjectAssignment = function buildObjectAssignment(id) {
    return t.variableDeclaration("var", [t.variableDeclarator(id, t.objectExpression([]))]);
  };

  ClassTransformer.prototype.wrapSuperCall = function wrapSuperCall(bareSuper, superRef, thisRef, body) {
    var bareSuperNode = bareSuper.node;

    if (this.isLoose) {
      bareSuperNode.arguments.unshift(t.thisExpression());
      if (bareSuperNode.arguments.length === 2 && t.isSpreadElement(bareSuperNode.arguments[1]) && t.isIdentifier(bareSuperNode.arguments[1].argument, { name: "arguments" })) {
        bareSuperNode.arguments[1] = bareSuperNode.arguments[1].argument;
        bareSuperNode.callee = t.memberExpression(superRef, t.identifier("apply"));
      } else {
        bareSuperNode.callee = t.memberExpression(superRef, t.identifier("call"));
      }
    } else {
      bareSuperNode = (0, _babelHelperOptimiseCallExpression2.default)(t.logicalExpression("||", t.memberExpression(this.classRef, t.identifier("__proto__")), t.callExpression(t.memberExpression(t.identifier("Object"), t.identifier("getPrototypeOf")), [this.classRef])), t.thisExpression(), bareSuperNode.arguments);
    }

    var call = t.callExpression(this.file.addHelper("possibleConstructorReturn"), [t.thisExpression(), bareSuperNode]);

    var bareSuperAfter = this.bareSuperAfter.map(function (fn) {
      return fn(thisRef);
    });

    if (bareSuper.parentPath.isExpressionStatement() && bareSuper.parentPath.container === body.node.body && body.node.body.length - 1 === bareSuper.parentPath.key) {

      if (this.superThises.length || bareSuperAfter.length) {
        bareSuper.scope.push({ id: thisRef });
        call = t.assignmentExpression("=", thisRef, call);
      }

      if (bareSuperAfter.length) {
        call = t.toSequenceExpression([call].concat(bareSuperAfter, [thisRef]));
      }

      bareSuper.parentPath.replaceWith(t.returnStatement(call));
    } else {
      bareSuper.replaceWithMultiple([t.variableDeclaration("var", [t.variableDeclarator(thisRef, call)])].concat(bareSuperAfter, [t.expressionStatement(thisRef)]));
    }
  };

  ClassTransformer.prototype.verifyConstructor = function verifyConstructor() {
    var _this2 = this;

    if (!this.isDerived) return;

    var path = this.userConstructorPath;
    var body = path.get("body");

    path.traverse(findThisesVisitor, this);

    var guaranteedSuperBeforeFinish = !!this.bareSupers.length;

    var superRef = this.superName || t.identifier("Function");
    var thisRef = path.scope.generateUidIdentifier("this");

    for (var _iterator3 = this.bareSupers, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
      var _ref3;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref3 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref3 = _i3.value;
      }

      var bareSuper = _ref3;

      this.wrapSuperCall(bareSuper, superRef, thisRef, body);

      if (guaranteedSuperBeforeFinish) {
        bareSuper.find(function (parentPath) {
          if (parentPath === path) {
            return true;
          }

          if (parentPath.isLoop() || parentPath.isConditional()) {
            guaranteedSuperBeforeFinish = false;
            return true;
          }
        });
      }
    }

    for (var _iterator4 = this.superThises, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : (0, _getIterator3.default)(_iterator4);;) {
      var _ref4;

      if (_isArray4) {
        if (_i4 >= _iterator4.length) break;
        _ref4 = _iterator4[_i4++];
      } else {
        _i4 = _iterator4.next();
        if (_i4.done) break;
        _ref4 = _i4.value;
      }

      var thisPath = _ref4;

      thisPath.replaceWith(thisRef);
    }

    var wrapReturn = function wrapReturn(returnArg) {
      return t.callExpression(_this2.file.addHelper("possibleConstructorReturn"), [thisRef].concat(returnArg || []));
    };

    var bodyPaths = body.get("body");
    if (bodyPaths.length && !bodyPaths.pop().isReturnStatement()) {
      body.pushContainer("body", t.returnStatement(guaranteedSuperBeforeFinish ? thisRef : wrapReturn()));
    }

    for (var _iterator5 = this.superReturns, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : (0, _getIterator3.default)(_iterator5);;) {
      var _ref5;

      if (_isArray5) {
        if (_i5 >= _iterator5.length) break;
        _ref5 = _iterator5[_i5++];
      } else {
        _i5 = _iterator5.next();
        if (_i5.done) break;
        _ref5 = _i5.value;
      }

      var returnPath = _ref5;

      if (returnPath.node.argument) {
        var ref = returnPath.scope.generateDeclaredUidIdentifier("ret");
        returnPath.get("argument").replaceWithMultiple([t.assignmentExpression("=", ref, returnPath.node.argument), wrapReturn(ref)]);
      } else {
        returnPath.get("argument").replaceWith(wrapReturn());
      }
    }
  };

  ClassTransformer.prototype.pushMethod = function pushMethod(node, path) {
    var scope = path ? path.scope : this.scope;

    if (node.kind === "method") {
      if (this._processMethod(node, scope)) return;
    }

    this.pushToMap(node, false, null, scope);
  };

  ClassTransformer.prototype._processMethod = function _processMethod() {
    return false;
  };

  ClassTransformer.prototype.pushConstructor = function pushConstructor(replaceSupers, method, path) {
    this.bareSupers = replaceSupers.bareSupers;
    this.superReturns = replaceSupers.returns;

    if (path.scope.hasOwnBinding(this.classRef.name)) {
      path.scope.rename(this.classRef.name);
    }

    var construct = this.constructor;

    this.userConstructorPath = path;
    this.userConstructor = method;
    this.hasConstructor = true;

    t.inheritsComments(construct, method);

    construct._ignoreUserWhitespace = true;
    construct.params = method.params;

    t.inherits(construct.body, method.body);
    construct.body.directives = method.body.directives;

    this._pushConstructor();
  };

  ClassTransformer.prototype._pushConstructor = function _pushConstructor() {
    if (this.pushedConstructor) return;
    this.pushedConstructor = true;

    if (this.hasInstanceDescriptors || this.hasStaticDescriptors) {
      this.pushDescriptors();
    }

    this.body.push(this.constructor);

    this.pushInherits();
  };

  ClassTransformer.prototype.pushInherits = function pushInherits() {
    if (!this.isDerived || this.pushedInherits) return;

    this.pushedInherits = true;
    this.body.unshift(t.expressionStatement(t.callExpression(this.file.addHelper("inherits"), [this.classRef, this.superName])));
  };

  return ClassTransformer;
}();

exports.default = ClassTransformer;
module.exports = exports["default"];