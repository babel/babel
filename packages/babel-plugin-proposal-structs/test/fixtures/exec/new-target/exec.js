struct S {}
struct D extends S {}

expect(() => S()).toThrow(TypeError);
expect(() => Reflect.construct(S, [], D)).toThrow(TypeError);
expect(() => Reflect.construct(S, [], function () {})).toThrow(TypeError);

class C extends S {}
expect(() => new C()).toThrow(TypeError);

expect(new D()).toBeInstanceOf(S);
