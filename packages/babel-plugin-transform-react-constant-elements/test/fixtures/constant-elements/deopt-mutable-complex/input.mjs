let foo = 'hello';

const mutate = () => {
  foo = 'goodbye';
}

export const Component = () => {
  if (Math.random() > 0.5) mutate();
  return <span>{foo}</span>;
};
