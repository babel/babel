let z = "outside";
const obj = {
  [z](a = "inside") {
    return a;
  }
};
