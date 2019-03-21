const sym = Symbol();
const sym1 = Symbol();

class A {
  [sym]: A.B;
  [sym1]: Array<A>;
}
