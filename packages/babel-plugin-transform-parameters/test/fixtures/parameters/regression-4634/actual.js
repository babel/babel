let oneOf = (...nodes) => {
  if (nodes.length === 1) {
    return nodes[0];
  }
  return ((new OneOfNode(nodes)): any)
}
