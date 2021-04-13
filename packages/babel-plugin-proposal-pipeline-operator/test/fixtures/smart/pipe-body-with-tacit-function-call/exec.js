const foo = {
  bar(value) {
    return value.toUpperCase();
  },
};

const result = 'Hello' |> foo.bar;

expect(result).toBe('HELLO');
