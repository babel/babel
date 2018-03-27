export default function f() {
  return 123;
}

expect(f).toBeInstanceOf(Function);
