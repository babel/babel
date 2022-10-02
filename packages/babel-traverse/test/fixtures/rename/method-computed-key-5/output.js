let z = "outside";
const obj = {
  [(() => z)()]() {
    let a = "inside";
    return a;
  }
};
