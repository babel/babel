let x = "outside";
function outer(a = () => eval("x")) {
  let x = "inside";
  return a();
}
outer();
