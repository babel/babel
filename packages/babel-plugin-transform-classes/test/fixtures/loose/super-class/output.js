var Test =
/*#__PURE__*/
function (_Foo) {
  babelHelpers.inheritsLoose(Test, _Foo);

  function Test(...args) {
    return _Foo.call.apply(_Foo, [this].concat(args)) || this;
  }

  return Test;
}(Foo);
