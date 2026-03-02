let z = "outside";
const obj = {
  get [{
    get [z]() {
      let a = "inside";
      return a;
    }
  }.outside]() {
    let a = "middle";
    return a;
  }
};
