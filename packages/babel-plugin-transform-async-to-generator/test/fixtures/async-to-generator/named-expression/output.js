var foo =
/*#__PURE__*/
function () {
  var _bar = babelHelpers.asyncToGenerator(function* () {
    console.log(bar);
  });

  function bar() {
    return _bar.apply(this, arguments);
  }

  return bar;
}();
