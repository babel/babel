// These tests fail to parse in strict mode, so we run them separately,
// without enabling strict mode.

var check = require("./shared.js").check;

describe("the arguments object (sloppy)", function () {
  it("should be shadowable by explicit declarations", function() {
    function *asParameter(x, arguments) {
      arguments = arguments + 1;
      yield x + arguments;
    }

    check(asParameter(4, 5), [10]);
    check(asParameter("asdf", "zxcv"), ["asdfzxcv1"]);

    function *asVariable(x) {
      // TODO References to arguments before the variable declaration
      // seem to see the object instead of the undefined value.
      var arguments = x + 1;
      yield arguments;
    }

    check(asVariable(4), [5]);
    check(asVariable("asdf"), ["asdf1"]);
  });
});
