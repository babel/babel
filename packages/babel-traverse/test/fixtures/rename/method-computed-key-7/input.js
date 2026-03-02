let a = "outside";

const obj = {
  get [
    {
      get [a]() {
        let a = "inside";
        return a;
      }
    }.outside
  ]() {
    let a = "middle";
    return a;
  }
};
