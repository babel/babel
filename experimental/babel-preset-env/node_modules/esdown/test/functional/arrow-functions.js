export const tests = {

  'lexical this'(test) {

    function f() {
      var a = () => this;
      return a();
    }

    let obj = {};

    test._('This value is lexically scoped')
      .equals(f.call(obj), obj);
  },

  'lexical arguments'(test) {

    function f() {
      var a = () => arguments;
      return Array.from(a('a', 'b', 'c'));
    }

    test._('The arguments object is lexically scoped')
      .equals(f(1, 2, 3), [1, 2, 3]);
  }

};
