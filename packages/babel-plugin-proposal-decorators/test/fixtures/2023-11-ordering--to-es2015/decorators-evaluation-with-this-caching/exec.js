let result = [];
const fn = () => { result.push(1); return () => {} }
const obj = {
  get prop() {
    result.push(2);
    return {
      get foo() { result.push(3); return () => {} }
    }
  }
};
class A {
  @fn()
  @obj.prop.foo
  method() {}
}

expect(result).toEqual([1, 2, 3]);
