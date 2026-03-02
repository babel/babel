function render() {
    const nodes = [];

    for(let i = 0; i < 5; i++) {
        nodes.push(<div>{i}</div>)
    }

    return nodes;
}
  