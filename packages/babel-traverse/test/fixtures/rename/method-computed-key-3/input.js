let a = "outside";

const obj = {
  [a](a = "inside") {
    return a;
  }
};
