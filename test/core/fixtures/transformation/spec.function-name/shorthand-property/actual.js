var Utils = {
  get: function() {}
};

var { get } = Utils;

var bar = {
  get: function(arg) {
    get(arg, "baz");
  }
};
