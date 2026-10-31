var country = "unset";
var rest = "unset";

const example = () => {
  const input = {};
  const foo = 'foo';

  ({
    [`${foo}_bar`]: country,
    ...rest
  } = input);
}

// The function is called to check what it assigns.
example();

expect(country).toBeUndefined();
expect(rest).toEqual({});
