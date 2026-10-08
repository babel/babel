class C extends class {
  static add(x, y) {
    return x + y; // Algebraic addition
  }
}
{
  static add(x, y) {
    return [x, y]; // Pair construction
  }
  static addOne = super.add(1, ?);
}

expect(C.addOne(5)).toEqual(6);
expect(C.addOne.length).toEqual(1);
expect(C.addOne.name).toEqual("add");
