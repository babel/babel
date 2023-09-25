let a = null;

let evaluated = false;
expect(() => {
  (a?.b) = (evaluated = true);
}).toThrow(TypeError);
//expect(evaluated).toBe(true);

evaluated = false;
expect(() => {
  (a?.b) += (evaluated = true);
}).toThrow(TypeError);
expect(evaluated).toBe(false);
