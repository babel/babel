let obj = {
  a: 123,

  foo(bar) {
    return new Promise(function ($return, $error) {
      return Promise.resolve(baz(bar)).then($return, $error);
    });
  }

};
