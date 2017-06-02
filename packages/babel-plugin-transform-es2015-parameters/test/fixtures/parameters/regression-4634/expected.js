let oneOf = (..._ref2) => {
  let [..._ref] = [..._ref2];
  let [...nodes] = [..._ref];

  if (nodes.length === 1) {
    return nodes[0];
  }
  return new OneOfNode(nodes);
};