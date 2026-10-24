class C {
  #x = 1;
  #list = [1, 2, 3];
  static m(instance, other) {
    const { #x: x, #list: [first, ...others], ...rest } = instance;
    let { #x: ox = 0, plain, ...restOther } = other;
    return { x, first, others, rest, ox, plain, restOther };
  }
}
