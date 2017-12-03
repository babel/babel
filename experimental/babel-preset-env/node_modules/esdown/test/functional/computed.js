export const tests = {

  'execution order'(test) {
    let list = [];

    ({
      a: (list.push(1), 1),
      [list.push(2) && 'b']: (list.push(3), 1),
      c: (list.push(4), 1)
    });

    test._('execution order is preserved when evaluating computed names')
      .equals(list, [1, 2, 3, 4]);
  },

  'name position'(test) {
    test._('works when first property is computed')
      .equals({ ['a']: 1, b: 2 }, { a: 1, b: 2 })

      ._('works when last property is computed')
      .equals({ a: 1, ['b']: 2 }, { a: 1, b: 2 })

      ._('works when only property is computed')
      .equals({ ['a']: 1 }, { a: 1 })

      ._('works when only property has trailing comma')
      .equals({ ['a']: 1, }, { a: 1 })
    ;
  },

  'getters and setters'(test) {
    let obj = {
      get ['a']() { return this.x; },
      x: 1,
      set ['a'](v) { this.x = v; },
    };

    test._('getters and setters work correctly')
      .equals(obj.a, 1)
      .equals(obj.x, 1)
      .equals((obj.a = 2, obj.x), 2)
    ;
  },

  'class methods'(test) {
    class C {
      ['a']() { return 1; }
    }

    test._('computed names in classes work')
      .equals(new C().a(), 1)
    ;
  }

};
