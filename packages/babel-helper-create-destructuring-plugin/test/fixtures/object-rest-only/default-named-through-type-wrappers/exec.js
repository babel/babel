// Type wrappers don't prevent the named evaluation of the anonymous
// functions they wrap, as the JavaScript output doesn't keep them.
function f({ ...r }: any, C = (class { static saved = this.name }) as any) {
  return C.saved;
}
expect(f({})).toBe("C");

const { h = (function () {}) satisfies object, ...rest } = {} as any;
expect(h.name).toBe("h");

let a: any;
[a] = [(() => {})!];
expect(a.name).toBe("");
