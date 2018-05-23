// Options: --async-functions

async function f() {
}

expect(Object.getPrototypeOf(f)).toBe(Function.prototype);
expect(f()).toBeInstanceOf(Promise);
