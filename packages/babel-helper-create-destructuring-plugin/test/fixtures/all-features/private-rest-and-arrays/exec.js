class C {
  #x = 1;
  #list = [1, 2, 3];
  static m(instance, other) {
    const { #x: x, #list: [first, ...others], ...rest } = instance;
    let { #x: ox = 0, plain, ...restOther } = other;
    return { x, first, others, rest, ox, plain, restOther };
  }
}
const instance = new C();
instance.pub = "p";
const other = new C();
other.plain = "q";
other.extra = "e";
expect(C.m(instance, other)).toEqual({
  x: 1,
  first: 1,
  others: [2, 3],
  rest: { pub: "p" },
  ox: 1,
  plain: "q",
  restOther: { extra: "e" },
});
