// The elements following a lowered one are only bound after it is
// destructured, which can throw or run user code reading them.
var z = 0;
expect(() => {
  [{ ...r }, z] = [null, 1];
}).toThrow(TypeError);
expect(z).toBe(0);

expect(() => {
  [{ ...r }, ...z] = [null, 1];
}).toThrow(TypeError);
expect(z).toBe(0);

var [{ a = () => typeof y, b = a(), ...s }, ...y] = [{}, 1];
expect(b).toBe("undefined");
expect(y).toEqual([1]);

expect(() => {
  let [{ ...t }, ...x] = [
    {
      get a() {
        return typeof x;
      },
    },
    1,
  ];
}).toThrow(ReferenceError);
