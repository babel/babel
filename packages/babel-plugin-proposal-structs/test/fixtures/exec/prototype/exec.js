let sealedInStaticBlock;
struct S {
  method() {}
  static {
    sealedInStaticBlock = Object.isSealed(S.prototype);
  }
}

expect(sealedInStaticBlock).toBe(false);
expect(Object.isSealed(S.prototype)).toBe(true);
expect(Object.getOwnPropertyDescriptor(S, "prototype").writable).toBe(false);
expect(S.prototype.constructor).toBe(S);
expect(Object.isFrozen(S)).toBe(false);
expect(S.name).toBe("S");
expect(S.length).toBe(0);
