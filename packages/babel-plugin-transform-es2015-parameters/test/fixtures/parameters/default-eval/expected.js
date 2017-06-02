let x = "outside";
function outer(..._ref) {
  let [a = () => {
    return eval("x");
  }] = [..._ref];
  {
    let x = "inside";
    return a();
  }
}outer();