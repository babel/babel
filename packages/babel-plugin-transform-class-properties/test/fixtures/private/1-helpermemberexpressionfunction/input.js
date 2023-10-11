class D {
  #arr;
  f() {
    for (const el of this.#arr);
  }
}

class C {
  #p;
  m() {
    for (this.#p of []);
  }
}

class E {
  #arr;
  f() {
    for (this.#arr of [1, 2]);
  }
}

class F {
  #ar;
  g() {
    for (this.#ar in [1,2,3]);
  }
}