var traverse = require("../lib").default;
var assert = require("assert");
var parse = require("babylon").parse;
var types = require("babel-types");

function getPath(code) {
  var ast = parse(code);
  var path;
  traverse(ast, {
    Program: function (_path) {
      path = _path;
      _path.stop();
    }
  });
  return path;
}

function pushInInnerScopeWith(code, pushFunc, checkVarScope) {
  var ast = parse(code);
  traverse(ast, {
    VariableDeclaration: function(path) {
      checkVarScope(path);
    },
    Function: function (path) {
      if (path.node.id.name === 'inner') {
        pushFunc(path);
      }
    }
  });
}


suite("scope", function () {
  suite("binding paths", function () {
    test("function declaration id", function () {
      assert.ok(getPath("function foo() {}").scope.getBinding("foo").path.type === "FunctionDeclaration");
    });

    test("function expression id", function () {
      assert.ok(getPath("(function foo() {})").get("body")[0].get("expression").scope.getBinding("foo").path.type === "FunctionExpression");
    });

    test("function param", function () {
      assert.ok(getPath("(function (foo) {})").get("body")[0].get("expression").scope.getBinding("foo").path.type === "Identifier");
    });

    test("variable declaration", function () {
      assert.ok(getPath("var foo = null;").scope.getBinding("foo").path.type === "VariableDeclarator");
      assert.ok(getPath("var { foo } = null;").scope.getBinding("foo").path.type === "VariableDeclarator");
      assert.ok(getPath("var [ foo ] = null;").scope.getBinding("foo").path.type === "VariableDeclarator");
      assert.ok(getPath("var { bar: [ foo ] } = null;").scope.getBinding("foo").path.type === "VariableDeclarator");
    });

    test("purity", function () {
      assert.ok(getPath("({ x: 1 })").get("body")[0].get("expression").isPure());
    });
  });

  suite("scope change api", function () { // https://phabricator.babeljs.io/T7247
    var codeWithScopes = "function outer () { function inner() {} }";
    var allScopeIsInner = list => !list.filter(val => val !== 'inner').length;
    test("check scope.push", function () {
      var scopes = [];
      pushInInnerScopeWith(
        codeWithScopes,
        function (path) {
          path.scope.push({id: types.identifier('foo')});
        },
        function (path) {
          scopes.push(path.scope.block.id.name);
        }
      );
      assert.ok(scopes.length === 1);
      assert.ok(allScopeIsInner(scopes));
    });
    test("check push var with body.unshiftContainer", function () {
      var scopes = [];
      pushInInnerScopeWith(
        codeWithScopes,
        function (path) {
          path.get("body").unshiftContainer("body", types.variableDeclaration("var", [
            types.variableDeclarator(types.identifier('foo'))
          ]));
        },
        function (path) {
          scopes.push(path.scope.block.id.name);
        }
      );
      assert.ok(scopes.length === 1);
      assert.ok(allScopeIsInner(scopes));
    });
  })
});
