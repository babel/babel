let useState = [{ some: 42 }, () => null];

// `useState[2]` is undefined, so destructuring it throws.
expect(() => {
  let {
    0: { numeric,...rest1 },
    '2': { str,...rest2 },
    1: setState,
  } = useState;
}).toThrow(TypeError);

useState = [{ some: 42, numeric: 1 }, () => null, { str: "str", other: 2 }];

let {
  0: { numeric,...rest1 },
  '2': { str,...rest2 },
  1: setState,
} = useState;

expect(numeric).toBe(1);
expect(rest1).toEqual({ some: 42 });
expect(str).toBe("str");
expect(rest2).toEqual({ other: 2 });
expect(setState).toBe(useState[1]);
