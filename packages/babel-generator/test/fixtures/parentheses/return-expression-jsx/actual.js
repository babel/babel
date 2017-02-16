const modifyName = name => name + ' modified ';

const Element = ({ name: input }) => {
  const name = modifyName(input);
  return (<div>
    {name}
  </div>);
};
