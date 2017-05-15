// #3861
function t(..._ref) {
  let [x = "default", { a, b }, ...args] = [..._ref];

  console.log(x, a, b, args);
}