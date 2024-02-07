// @force-old-private-helpers

class A {
  static #s_f = 0;
  static #s_m() {}
  static get #s_g() {}
  static set #s_s(v) {}
  static get #s_gs() {}
  static set #s_gs(v) {}

  #i_f = 0;
  #i_m() {}
  get #i_g() {}
  set #i_s(v) {}
  get #i_gs() {}
  set #i_gs(v) {}

  static read() {
    A.#s_f;
    A.#s_m;
    A.#s_g;
    A.#s_s;
    A.#s_gs;

    const a = new A();
    a.#i_f;
    a.#i_m;
    a.#i_g;
    a.#i_s;
    a.#i_gs;
  }

  static write() {
    A.#s_f = 1;
    A.#s_m = 2;
    A.#s_g = 3;
    A.#s_s = 4;
    A.#s_gs = 5;

    const a = new A();
    a.#i_f = 6;
    a.#i_m = 7;
    a.#i_g = 8;
    a.#i_s = 9;
    a.#i_gs = 10;
  }

  static write_destructuring() {
    [A.#s_f] = [1];
    [A.#s_m] = [2];
    [A.#s_g] = [3];
    [A.#s_s] = [4];
    [A.#s_gs] = [5];

    const a = new A();
    [a.#i_f] = [6];
    [a.#i_m] = [7];
    [a.#i_g] = [8];
    [a.#i_s] = [9];
    [a.#i_gs] = [10];
  }
}
