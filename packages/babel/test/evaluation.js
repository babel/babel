var evaluation = require("../lib/traversal/path/evaluation");
var traverse   = require('../lib/traversal');
var parse      = require("../lib/helpers/parse");
var assert     = require("assert");

suite("evaluation", function () {
  test("binary expression", function () {
    traverse(parse("5 + 5"), {
      enter: function (node) {
        if (this.isBinaryExpression()) {
          assert.deepEqual(this.evaluate(), { confident: true, value: 10 });
        }
      }
    });

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

  test("logical expression", function () {
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
