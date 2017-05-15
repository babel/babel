const a = 1;
function rest(..._ref) {
  let [b = a, ...a] = [..._ref];

  return [a, b];
}