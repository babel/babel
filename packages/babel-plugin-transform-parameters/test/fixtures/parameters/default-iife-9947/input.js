let x = "outside";
function outer(a = () => x) {
  let x = "inside";
  return a();
}
outer();
