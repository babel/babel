const example = () => {
  const input = {};
  const foo = 'foo';

  ({
    [`${foo}_bar`]: country,
    ...rest
  } = input);
}
