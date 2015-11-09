function f() {
  f;
}

{
  let obj = {
    f: function () {
      f;
    }
  };
}

(function b() {
  var obj = {
    b: function () {
      b;
    }
  };
});
