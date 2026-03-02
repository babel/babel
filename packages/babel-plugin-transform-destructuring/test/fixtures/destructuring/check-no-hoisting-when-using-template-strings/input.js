const example = (obj) => {
  const foo = 'foo';
  const { [`prefix_${foo}`]: _, ...rest } = obj;
};
