function _f() {
  _f;
}

{
  let obj = {
    f: function f() {
      _f;
    }
  };
}

(function _b() {
  var obj = {
    b: function b() {
      _b;
    }
  };

  function commit(b) {
    b();
  }
});
