export var tests = {

  'assignment'(test) {
    let array = [1, 2], a, b;
    test
      ._('assignment expression evaluates to RHS')
      .assert(([a, b] = array) === array);
  },

  'array patterns'(test) {
    let array = [1, 2], a, b;
    [a, b] = array;
    test._('assignment').equals([a, b], array);

    let [c, d] = array;
    test._('declaration').equals([c, d], array);
    [a,, b] = [1, 2, 3];
    test._('holes').equals([a, b], [1, 3]);

    let [e, ...args] = [1, 2, 3, 4];
    test._('rest').equals(e, 1).equals(args, [2, 3, 4]);
    [,,, ...args] = [1, 2, 3, 4, 5, 6, 7];
    test.equals(args, [4, 5, 6, 7]);

    (([a,, ...args]) => {
      test._('function arguments')
      test.equals(a, 1).equals(args, [3, 4, 5]);
    })([1, 2, 3, 4, 5]);

    [a] = 'hello';
    test._('to object conversion').equals(a, 'h');
  },

  'object patterns'(test) {
    var a, b, c;

    ({ a, b } = { a: 1, b: 2 });
    test._('assignment').equals([a, b], [1, 2]);

    var { a, b } = { a: 1, b: 2 };
    test._('declaration').equals([a, b], [1, 2]);

    ({ c: a, d: b } = { c: 1, d: 2 });
    test._('renaming').equals([a, b], [1, 2]);

    ({ 'a': a, 0: b } = { a: 1, 0: 2 });
    test._('string and number property names').equals([a, b], [1, 2]);

    ({ a = 'foo', c: b = 'bar' } = {});
    test._('defaults').equals([a, b], ['foo', 'bar']);

    ({ charAt: a } = 'foo');
    test._('to object conversion').equals(a, String.prototype.charAt);
  },
};
