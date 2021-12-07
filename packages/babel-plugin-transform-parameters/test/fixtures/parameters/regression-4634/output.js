let oneOf = function () {
  for (var _args = arguments, _len = _args.length, nodes = new Array(_len), _key = 0; _key < _len; _key++) {
    nodes[_key] = _args[_key];
  }

  if (nodes.length === 1) {
    return nodes[0];
  }

  return new OneOfNode(nodes);
};
