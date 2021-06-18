const example = () => {
  const input = {};
  const foo = 'foo';

  const {
    [`${foo}_bar`]: country,
    ...rest
  } = input;
}
