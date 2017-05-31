var doubleIfFour = function (b) {
  var t = b.types;
  return {
    visitor: {
      NumericLiteral(path) {
        var value = path.node.value;
        if (value === 4) {
          path.replaceWith(t.numericLiteral(value * 2));
        }
      }
    }
  };
};

var doubleIfTen = function (b) {
  var t = b.types;
  return {
    visitor: {
      NumericLiteral(path) {
        var value = path.node.value;
        if (value === 10) {
          path.replaceWith(t.numericLiteral(value * 2));
        }
      }
    }
  };
};

// transforms to `2 + 8 + 20`
var res = transform('1 + 4 + 10', {
  plugins: function doubleIfOne (b) {
    var t = b.types;
    return {
      inherits: [
        doubleIfFour,
        doubleIfTen
      ],
      visitor: {
        NumericLiteral(path) {
          var value = path.node.value;
          if (value === 1) {
            path.replaceWith(t.numericLiteral(value * 2));
          }
        }
      }
    };
  }
});

assert.equal(eval(res.code), 30);
