const fn = () => `${Symbol()}`;

expect(fn).toThrow(TypeError);
