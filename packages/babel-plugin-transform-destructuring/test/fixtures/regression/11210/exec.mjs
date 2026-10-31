// `export default` is removed: the exec test isn't run as a module.
class A {
  handle = value => {
    ({ value } = {});
    return value;
  }
}

expect(new A().handle(1)).toBeUndefined();
expect(new A().handle).not.toBe(new A().handle);
