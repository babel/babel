function render() {
  const nodes = [];
  for (let i = 0; i < 5; i++) {
    const o = "foo";
    const n = i;
    nodes.push(<div>{n}</div>);
  }
  return nodes;
}
