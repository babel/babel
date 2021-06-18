const example = () => {
  const input = {};
  const foo = 'foo';
  const {
    [`${foo}_bar`]: country
  } = input,
        rest = babelHelpers.objectWithoutProperties(input, [`${foo}_bar`]);
};
