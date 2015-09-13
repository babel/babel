var evaluation = require("../lib/traversal/path/evaluation");
var traverse   = require('../lib/traversal');
var parse      = require("../lib/helpers/parse");
var assert     = require("assert");

suite("evaluation", function () {
  test("UnaryExpression: void a", function () {
    traverse(parse("void 0"), {
      enter: function (node) {
        if (this.isUnaryExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: undefined });
        }
      }
    });
  });

  test("UnaryExpression: !a", function () {
    traverse(parse("!true"), {
      enter: function (node) {
        if (this.isUnaryExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: false });
        }
      }
    });
  });

  test("UnaryExpression +a", function () {
    traverse(parse("+'2'"), {
      enter: function (node) {
        if (this.isUnaryExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: 2 });
        }
      }
    });
  });

  test("UnaryExpression -a", function () {
    traverse(parse("-'2'"), {
      enter: function (node) {
        if (this.isUnaryExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: -2 });
        }
      }
    });
  });

  test("UnaryExpression: ~a", function () {
    traverse(parse("~1"), {
      enter: function (node) {
        if (this.isUnaryExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: -2 });
        }
      }
    });
  });

  test("BinaryExpression: a - b", function () {
    traverse(parse("3 - 1"), {
      enter: function (node) {
        if (this.isBinaryExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: 2 });
        }
      }
    });
  });

  test("BinaryExpression: a + b", function () {
    traverse(parse("5 + 5"), {
      enter: function (node) {
        if (this.isBinaryExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: 10 });
        }
      }
    });
  });

  test("BinaryExpression: a / b", function () {
    traverse(parse("10 / 2"), {
      enter: function (node) {
        if (this.isBinaryExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: 5 });
        }
      }
    });
  });

  test("BinaryExpression: a * b", function () {
    traverse(parse("2 * 3"), {
      enter: function (node) {
        if (this.isBinaryExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: 6 });
        }
      }
    });
  });

  test("BinaryExpression: a % b", function () {
    traverse(parse("4 % 2"), {
      enter: function (node) {
        if (this.isBinaryExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: 0 });
        }
      }
    });
  });

  test("BinaryExpression: a ** b", function () {
    traverse(parse("2 ** 3", { features: { "es7.exponentiationOperator": true } }), {
      enter: function (node) {
        if (this.isBinaryExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: 8 });
        }
      }
    });
  });

  test("BinaryExpression: a < b", function () {
    traverse(parse("1 < 2"), {
      enter: function (node) {
        if (this.isBinaryExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: true });
        }
      }
    });
  });

  test("BinaryExpression: a > b", function () {
    traverse(parse("1 > 2"), {
      enter: function (node) {
        if (this.isBinaryExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: false });
        }
      }
    });
  });

  test("BinaryExpression: a <= b", function () {
    traverse(parse("1 <= 2"), {
      enter: function (node) {
        if (this.isBinaryExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: true });
        }
      }
    });
  });

  test("BinaryExpression: a >= b", function () {
    traverse(parse("1 >= 2"), {
      enter: function (node) {
        if (this.isBinaryExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: false });
        }
      }
    });
  });

  test("BinaryExpression: a == b", function () {
    traverse(parse("1 == '1'"), {
      enter: function (node) {
        if (this.isBinaryExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: true });
        }
      }
    });
  });

  test("BinaryExpression: a != b", function () {
    traverse(parse("1 != 2"), {
      enter: function (node) {
        if (this.isBinaryExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: true });
        }
      }
    });
  });

  test("BinaryExpression: a === b", function () {
    traverse(parse("'str' === 'str'"), {
      enter: function(node) {
        if (this.isBinaryExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: true });
        }
      }
    });
    traverse(parse("'four' === 4"), {
      enter: function(node) {
        if (this.isBinaryExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: false });
        }
      }
    });
  });

  test("BinaryExpression: a !== b", function () {
    traverse(parse("'four' !== '4'"), {
      enter: function(node) {
        if (this.isBinaryExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: true });
        }
      }
    });
    traverse(parse("'str' !== 'str'"), {
      enter: function(node) {
        if (this.isBinaryExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: false });
        }
      }
    });
  });

  test("BinaryExpression: a | b", function () {
    traverse(parse("1 | 0"), {
      enter: function(node) {
        if (this.isBinaryExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: 1 });
        }
      }
    });
  });

  test("BinaryExpression: a & b", function () {
    traverse(parse("1 & 1"), {
      enter: function (node) {
        if (this.isBinaryExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: 1 });
        }
      }
    });
  });

  test("BinaryExpression: a ^ b", function () {
    traverse(parse("1 ^ 0"), {
      enter: function (node) {
        if (this.isBinaryExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: 1 });
        }
      }
    });
  });

  test("BinaryExpression: a << b", function () {
    traverse(parse("1 << 2"), {
      enter: function (node) {
        if (this.isBinaryExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: 4 });
        }
      }
    });
  });

  test("BinaryExpression: a >> b", function () {
    traverse(parse("1 >> 2"), {
      enter: function (node) {
        if (this.isBinaryExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: 0 });
        }
      }
    });
  });

  test("BinaryExpression: a in b (not evaluated)", function () {
    traverse(parse("1 in [1]"), {
      enter: function (node) {
        if (this.isBinaryExpression()) {
          assert.deepEqual(this.evaluate(), { confident: false, value: undefined });
        }
      }
    });
  });

  test("BinaryExpression: a instanceof b (not evaluated)", function () {
    traverse(parse("A instanceof B"), {
      enter: function (node) {
        if (this.isBinaryExpression()) {
          assert.deepEqual(this.evaluate(), { confident: false, value: undefined });
        }
      }
    });
  });

  test("LogicalExpression", function () {
    traverse(parse("'abc' === 'abc' && 1 === 1"), {
      enter: function(node) {
        if (this.isLogicalExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: true });
        }
      }
    });

    traverse(parse("'abc' === 'abc' && 1 === 10"), {
      enter: function(node) {
        if (this.isLogicalExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: false });
        }
      }
    });

    traverse(parse("'abc' === 'xyz' && 1 === 1"), {
      enter: function(node) {
        if (this.isLogicalExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: false });
        }
      }
    });

    traverse(parse("'abc' === 'xyz' && 1 === 10"), {
      enter: function(node) {
        if (this.isLogicalExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: false });
        }
      }
    });

    traverse(parse("'abc' === 'abc' || 1 === 1"), {
      enter: function(node) {
        if (this.isLogicalExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: true });
        }
      }
    });

    traverse(parse("'abc' === 'abc' || 1 === 10"), {
      enter: function(node) {
        if (this.isLogicalExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: true });
        }
      }
    });

    traverse(parse("'abc' === 'xyz' || 1 === 1"), {
      enter: function(node) {
        if (this.isLogicalExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: true });
        }
      }
    });

    traverse(parse("'abc' === 'xyz' || 1 === 10"), {
      enter: function(node) {
        if (this.isLogicalExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: false });
        }
      }
    });
  });

  test("logical expression without certainty", function () {
    traverse(parse("'abc' === 'abc' || config.flag === 1"), {
      enter: function(node) {
        if (this.isLogicalExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: true });
        }
      }
    });

    traverse(parse("obj.a === 'abc' || config.flag === 1"), {
      enter: function(node) {
        if (this.isLogicalExpression()) {
          assert.deepEqual(this.evaluate(), { confident: false, value: undefined });
        }
      }
    });

    traverse(parse("'abc' !== 'abc' && config.flag === 1"), {
      enter: function(node) {
        if (this.isLogicalExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: false });
        }
      }
    });

    traverse(parse("obj.a === 'abc' && 1 === 1"), {
      enter: function(node) {
        if (this.isLogicalExpression()) {
          assert.deepEqual(this.evaluate(), { confident: false, value: undefined });
        }
      }
    });

    traverse(parse("'abc' === 'abc' && (1 === 1 || config.flag)"), {
      enter: function(node) {
        if (this.isLogicalExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: true });
        }
      }
    });

    traverse(parse("'abc' === 'xyz' || (1 === 1 && config.flag)"), {
      enter: function(node) {
        if (this.isLogicalExpression()) {
          assert.deepEqual(this.evaluate(), { confident: false, value: undefined });
        }
      }
    });

    traverse(parse("'abc' === 'xyz' || (1 === 1 && 'four' === 'four')"), {
      enter: function(node) {
        if (this.isLogicalExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: true });
        }
      }
    });

    traverse(parse("'abc' === 'abc' && (1 === 1 && 'four' === 'four')"), {
      enter: function(node) {
        if (this.isLogicalExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: true });
        }
      }
    });
  });
});
