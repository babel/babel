let a = "outside";

const obj = {
  [a]() {
    let a = "inside";
    return a;
  }
};
