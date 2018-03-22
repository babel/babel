export default function f() {
  return 123;
}

expect(f instanceof Function).toBe(true);
