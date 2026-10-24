// the object rest helper returns `{}` for null when some keys are excluded
expect(() => { const { a: void, ...rest } = null; }).toThrow(TypeError);
expect(() => { const { a: void, ...rest } = undefined; }).toThrow(TypeError);
expect(() => { const { ...all } = null; }).toThrow(TypeError);

const { a: void, ...rest } = { a: 1, b: 2 };
expect(rest).toEqual({ b: 2 });
