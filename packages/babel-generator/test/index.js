var Whitespace = require("../lib/whitespace");
var Printer    = require("../lib/printer");
var generate   = require("../lib");
var assert     = require("assert");
var parse      = require("babylon").parse;
var chai       = require("chai");
var t          = require("babel-types");
var _          = require("lodash");

suite("generation", function () {
  test("completeness", function () {
    _.each(t.VISITOR_KEYS, function (keys, type) {
      assert.ok(!!Printer.prototype[type], type + " should exist");
    });

    _.each(Printer.prototype, function (fn, type) {
      if (!/[A-Z]/.test(type[0])) return;
      assert.ok(t.VISITOR_KEYS[type], type + " should not exist");
    });
  });

  test("multiple sources", function () {
    var sources = {
      "a.js": "function hi (msg) { console.log(msg); }\n",
      "b.js": "hi('hello');\n"
    };
    var parsed = _.keys(sources).reduce(function (_parsed, filename) {
      _parsed[filename] = parse(sources[filename], { sourceFilename: filename });
      return _parsed;
    }, {});

    var combinedAst = {
      "type": "File",
      "program": {
        "type": "Program",
        "sourceType": "module",
        "body": [].concat(parsed["a.js"].program.body, parsed["b.js"].program.body)
      }
    };

    var generated = generate.default(combinedAst, { sourceMaps: true }, sources);

    chai.expect(generated.map).to.deep.equal({
      version: 3,
      sources: [ 'a.js', 'b.js' ],
      names: [],
      mappings: 'AAAA,SAAS,EAAT,CAAa,GAAb,EAAkB;AAAE,UAAQ,GAAR,CAAY,GAAZ;AAAmB;;ACAvC,GAAG,OAAH',
      sourcesContent: [
      'function hi (msg) { console.log(msg); }\n',
        'hi(\'hello\');\n'
      ]
    }, "sourcemap was incorrectly generated");

    chai.expect(generated.code).to.equal(
      "function hi(msg) {\n  console.log(msg);\n}\n\nhi('hello');",
      "code was incorrectly generated"
    );
  });
});


suite("programmatic generation", function() {
  test("numeric member expression", function() {
    // Should not generate `0.foo`
    var mem = t.memberExpression(t.numericLiteral(60702), t.identifier("foo"));
    new Function(generate.default(mem).code);
  });

  test("nested if statements needs block", function() {
    var ifStatement = t.ifStatement(
      t.stringLiteral("top cond"),
      t.whileStatement(
        t.stringLiteral("while cond"),
        t.ifStatement(
          t.stringLiteral("nested"),
          t.expressionStatement(t.numericLiteral(1))
        )
      ),
      t.expressionStatement(t.stringLiteral("alt"))
    );

    var ast = parse(generate.default(ifStatement).code);
    assert.equal(ast.program.body[0].consequent.type, 'BlockStatement');
  });
});


suite("whitespace", function () {
  test("empty token list", function () {
    var w = new Whitespace([]);
    assert.equal(w.getNewlinesBefore(t.stringLiteral('1')), 0);
  });
});

var suites = require("babel-helper-fixtures").default(__dirname + "/fixtures");

suites.forEach(function (testSuite) {
  suite("generation/" + testSuite.title, function () {
    _.each(testSuite.tests, function (task) {
      test(task.title, !task.disabled && function () {
        var expect = task.expect;
        var actual = task.actual;

        var actualAst = parse(actual.code, {
          filename: actual.loc,
          plugins: [
            "jsx",
            "flow",
            "decorators",
            "asyncFunctions",
            "exportExtensions",
            "functionBind",
            "classConstructorCall",
          ],
          strictMode: false,
          sourceType: "module",
        });

        var actualCode = generate.default(actualAst, task.options, actual.code).code;
        chai.expect(actualCode).to.equal(expect.code, actual.loc + " !== " + expect.loc);
      });
    });
  });
});
