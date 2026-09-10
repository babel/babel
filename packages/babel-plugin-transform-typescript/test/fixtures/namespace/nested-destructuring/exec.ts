namespace N {
  const arr = [1, 2, 3];
  export const [a] = arr;
  export const { 1: b } = arr;
  export const { foo: [ {[1 + 1]: c } ] } = { foo: [arr] }
}

expect(N).toEqual({ a: 1, b: 2, c: 3 });
