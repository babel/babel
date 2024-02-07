// @force-old-private-helpers

let s_s, s_gs, i_s, i_gs;

class A {
  static #s_f = 0;
  static #s_m() { return 1 }
  static get #s_g() { return 2 }
  static set #s_s(v) { s_s = v }
  static get #s_gs() { return 3 }
  static set #s_gs(v) { s_gs = v }

  #i_f = 4;
  #i_m() { return 5 }
  get #i_g() { return 6 }
  set #i_s(v) { i_s = v }
  get #i_gs() { return 7 }
  set #i_gs(v) { i_gs = v }

  static read() {
    expect(A.#s_f).toBe(0);
    expect(A.#s_m()).toBe(1);
    expect(A.#s_g).toBe(2);
    // expect(() => A.#s_s).toThrow(TypeError); -- This was never implemented properly
    expect(A.#s_gs).toBe(3);

    const a = new A();
    expect(a.#i_f).toBe(4);
    expect(a.#i_m()).toBe(5);
    expect(a.#i_g).toBe(6);
    expect(() => a.#i_s).toThrow(TypeError);
    expect(a.#i_gs).toBe(7);
  }

  static write() {
    A.#s_f = 8; expect(A.#s_f).toBe(8);
    expect(() => A.#s_m = 0).toThrow(TypeError); expect(A.#s_m()).toBe(1);
    expect(() => A.#s_g = 0).toThrow(TypeError); expect(A.#s_g).toBe(2);
    A.#s_s = 9; expect(s_s).toBe(9);
    A.#s_gs = 10; expect(s_gs).toBe(10);

    const a = new A();
    a.#i_f = 11; expect(a.#i_f).toBe(11);
    expect(() => a.#i_m = 0).toThrow(TypeError); expect(a.#i_m()).toBe(5);
    expect(() => a.#i_g = 0).toThrow(TypeError); expect(a.#i_g).toBe(6);
    a.#i_s = 12; expect(i_s).toBe(12);
    a.#i_gs = 13; expect(i_gs).toBe(13);
  }

  static write_destructuring() {
    [A.#s_f] = [14]; expect(A.#s_f).toBe(14);
    expect(() => [A.#s_m] = [0]).toThrow(TypeError); expect(A.#s_m()).toBe(1);
    expect(() => [A.#s_g] = [0]).toThrow(TypeError); expect(A.#s_g).toBe(2);
    [A.#s_s] = [15]; expect(s_s).toBe(15);
    [A.#s_gs] = [16]; expect(s_gs).toBe(16);

    const a = new A();
    [a.#i_f] = [17]; expect(a.#i_f).toBe(17);
    expect(() => [a.#i_m] = [0]).toThrow(TypeError); expect(a.#i_m()).toBe(5);
    expect(() => [a.#i_g] = [0]).toThrow(TypeError); expect(a.#i_g).toBe(6);
    [a.#i_s] = [18]; expect(i_s).toBe(18);
    [a.#i_gs] = [19]; expect(i_gs).toBe(19);
  }
}

A.read();
A.write();
A.write_destructuring();
