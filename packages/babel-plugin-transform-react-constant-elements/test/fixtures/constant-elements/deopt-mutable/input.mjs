let foo = 'hello';

export const Component = () => {
  foo = 'goodbye';
  return <span>{foo}</span>;
};
