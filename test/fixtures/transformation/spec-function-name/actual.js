var obj = {
  f: function () {
    (function f() {
      console.log(f);
    })();
  },

  g: function () {
    console.log(g);
  },

  h: function () {
    console.log(h);
  },

  m: function () {
    doSmth();
  }
};

var f = function () {
  console.log(f, g);
};

var g = function () {
  doSmth();
};
