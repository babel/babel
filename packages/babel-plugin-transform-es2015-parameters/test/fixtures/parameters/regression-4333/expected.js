const args = 'bar';
function foo(..._ref2) {
  let [..._ref] = [..._ref2];
  let [...args] = [..._ref];

  return args;
}