console.log(class A {
  method() {
    babelHelpers.classCheckPrivateStaticAccess(this, A, _foo).call(this);
  }

});

function _foo() {}
