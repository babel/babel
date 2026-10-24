var logged = [];
var console = {
  log(value) {
    logged.push(value);
  },
};

function fn0(obj0) {
  const {
    fn1 = (obj1 = {}) => {
      const {
        fn2 = (obj2 = {}) => {
          const {a, ...rest} = obj2;
          console.log(rest);
        }
      } = obj1;
      return fn2;
    }
  } = obj0;
  return fn1;
}

var fn1 = fn0({});
var fn2 = fn1();
var obj2 = { a: 1, b: 2, c: 3 };
expect(fn2(obj2)).toBeUndefined();
expect(logged).toEqual([{ b: 2, c: 3 }]);
expect(logged[0]).not.toBe(obj2);
fn2();
expect(logged).toEqual([{ b: 2, c: 3 }, {}]);
fn1({})({ a: 1 });
expect(logged).toEqual([{ b: 2, c: 3 }, {}, {}]);

var custom = () => "custom";
expect(fn0({ fn1: custom })).toBe(custom);
expect(fn1({ fn2: custom })).toBe(custom);

expect(() => fn0(null)).toThrow(TypeError);
expect(() => fn0()).toThrow(TypeError);
expect(() => fn1(null)).toThrow(TypeError);
expect(() => fn2(null)).toThrow(TypeError);
expect(logged).toHaveLength(3);
