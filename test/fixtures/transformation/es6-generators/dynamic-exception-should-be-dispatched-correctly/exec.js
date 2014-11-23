function *gen(x, fname) {
    try {
      return fns[fname](x);
    } catch (thrown) {
      yield thrown;
    }
  }

  var fns = {
    f: function(x) {
      throw x;
    },

    g: function(x) {
      return x;
    }
  };

  genHelpers.check(gen("asdf", "f"), ["asdf"]);
  genHelpers.check(gen("asdf", "g"), [], "asdf");
