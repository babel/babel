var A = function() {
  function A() {}

  Object.defineProperties(A, {
    a: {
      writeable: true,
      value: function() {}
    },

    b: {
      get: function() {},
      set: function(b) {}
    }
  });

  return A;
}();
