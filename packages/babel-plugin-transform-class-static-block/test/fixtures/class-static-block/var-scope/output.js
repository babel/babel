var _staticBlock;
let res = [];
let foo = 1;
class A {
  static x = (_staticBlock = () => ((() => {
    var foo = 4;
  })(), res.push(foo)), (() => {
    var foo = 3;
  })(), void res.push(foo));
}
_staticBlock();
expect(res).toEqual([1, 1]);
