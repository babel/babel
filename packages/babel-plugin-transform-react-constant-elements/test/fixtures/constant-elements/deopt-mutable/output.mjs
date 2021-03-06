var _span;

let foo = 'hello';
export const Component = () => {
  foo = 'goodbye';
  return _span || (_span = <span>{foo}</span>);
};
