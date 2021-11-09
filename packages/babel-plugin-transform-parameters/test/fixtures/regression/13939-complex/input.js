class A extends B {
  handle = ((x = 0) => {
    console.log(x, this, new.target, super.y);
  })(() => {
    let y = 0;
    return (x = y) => x + this;
  })((x = 1) => {})(this);
}
