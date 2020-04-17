var Utils = {
  get: function() {}
};

var { get } = Utils;

var bar = {
  get: function(arg) {
    get(arg, "baz");
  }
};

var f = function ({ foo = "bar" }) {
  var obj = {
    // same name as parameter
    foo: function () {
      foo;
    }
  };
};
