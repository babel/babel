export const tests = {

  'default parameters'(test) {
    function f(a = 'foo') { return a; }

    test
      ._('triggered when argument is not preset')
      .equals(f(), 'foo')
      ._('triggered when argument is undefined')
      .equals(f(void 0), 'foo')
      ._('not triggered when argument is null')
      .equals(f(null), null)
    ;
  }

};
