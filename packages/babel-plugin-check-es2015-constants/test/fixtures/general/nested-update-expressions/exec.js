assert.throws(function() {
  const c = 17;
  let a = 0;

  function f() {
    return ++c+--a;
  }

  f();

}, '"c" is read-only');
