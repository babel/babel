let dec1, dec2, dec3;

@dec1
class A {
  [notSymbol()] = 1;
  @dec2 [Symbol.iterator] = 2;
  [Symbol.for("foo")] = 3;
  @dec3 [notSymbolAgain()] = 4;
}
