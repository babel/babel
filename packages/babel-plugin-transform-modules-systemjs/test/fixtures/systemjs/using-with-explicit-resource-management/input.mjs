using x = foo();
await using y = bar();
export { x };
export function f() { return y; }
