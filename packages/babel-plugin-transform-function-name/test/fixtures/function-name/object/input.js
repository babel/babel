var obj = {
  f: function () {
    (function f() {
      console.log(f);
    })();
  },

  h: function () {
    console.log(h);
  },

  m: function () {
    doSmth();
  }
};
