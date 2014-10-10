var A = function() {
  function A() {}

  A.a = function() {};

  Object.defineProperties(A, {
    b: {
      get: function() {},
      set: function(b) {}
    }
  });

  return A;
}();
