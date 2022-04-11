// #3861
function t(x = "default", { a, b }, ...args) {
  console.log(x, a, b, args);
}
