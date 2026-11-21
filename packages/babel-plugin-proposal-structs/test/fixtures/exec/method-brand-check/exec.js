struct S {
  method() {
    return this;
  }
  get getter() {
    return this;
  }
  *generator() {}
  async asyncMethod() {}
  static staticMethod() {
    return this;
  }
}
struct D extends S {
  other() {}
}

const s = new S();
const d = new D();
const { method } = S.prototype;

expect(s.method()).toBe(s);
expect(d.method()).toBe(d);
expect(() => method.call({})).toThrow(TypeError);
expect(() => method.call(1)).toThrow(TypeError);
expect(() => method()).toThrow(TypeError);
expect(() => D.prototype.other.call(s)).toThrow(TypeError);
expect(() => method.call(Object.create(S.prototype))).toThrow(TypeError);
expect(() => new method()).toThrow(TypeError);

// The only own property of struct method exotic objects is the "name" set
// by MethodDefinitionEvaluation
expect(Reflect.ownKeys(method)).toEqual(["name"]);
expect(method.name).toBe("method");
expect(method.length).toBe(0);
expect(Object.getPrototypeOf(method)).toBe(Function.prototype);

const sym = Symbol("desc");
const emptySym = Symbol("");
const noDescSym = Symbol();
struct Names {
  [sym]() {}
  [emptySym]() {}
  [noDescSym]() {}
  [1 + 1]() {}
}
expect(Names.prototype[sym].name).toBe("[desc]");
expect(Names.prototype[emptySym].name).toBe("[]");
expect(Names.prototype[noDescSym].name).toBe("");
expect(Names.prototype[2].name).toBe("2");
expect(() => Names.prototype[sym].call({})).toThrow(TypeError);

// Private methods are wrapped too
struct P {
  #m() {
    return this;
  }
  *#g() {}
  async #a() {}
  getM() {
    return this.#m;
  }
  callM() {
    return this.#m();
  }
  getG() {
    return this.#g;
  }
  getA() {
    return this.#a;
  }
  static has(o) {
    return #m in o;
  }
  setM() {
    this.#m = 1;
  }
}
struct PD extends P {}
const p = new P();
const pm = p.getM();
expect(p.callM()).toBe(p);
expect(pm.call(p)).toBe(p);
expect(pm.call(new PD())).toBeInstanceOf(PD);
expect(() => pm.call({})).toThrow(TypeError);
expect(() => pm()).toThrow(TypeError);
expect(() => new pm()).toThrow(TypeError);
expect(new P().getM()).toBe(pm);
expect(new PD().getM()).toBe(pm);
expect(pm.name).toBe("#m");
expect(Reflect.ownKeys(pm)).toEqual(["name"]);
expect(Object.getPrototypeOf(pm)).toBe(Function.prototype);
expect(P.has(p)).toBe(true);
expect(P.has({})).toBe(false);
expect(() => p.setM()).toThrow(TypeError);
expect(() => p.getG().call({})).not.toThrow();
expect(p.getA().call({})).toBeInstanceOf(Promise);

// Only methods defined via DefineMethod are wrapped
const desc = Object.getOwnPropertyDescriptor(S.prototype, "getter");
expect(desc.get.call(1)).toBe(1);
expect(S.prototype.generator.name).toBe("generator");
expect(S.prototype.asyncMethod.name).toBe("asyncMethod");
expect(S.staticMethod()).toBe(S);

// The last definition of a key wins
struct Dup {
  foo() {}
  async foo() {}
  *bar() {}
  bar() {}
  ["baz"]() {}
  get baz() {
    return 1;
  }
}
expect(Dup.prototype.foo.call({})).toBeInstanceOf(Promise);
expect(() => Dup.prototype.bar.call({})).toThrow(TypeError);
expect(new Dup().baz).toBe(1);

// Computed keys can redefine methods too
const k = "a";
struct G {
  a() {}
  *[k]() {
    yield 1;
  }
}
expect(() => G.prototype.a.call({})).not.toThrow();
