for (let i of [1]) {
  setTimeout(() => i);
  {
    function c() {}
  }
  c;
}
let c = 2;
