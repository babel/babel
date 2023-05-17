// https://github.com/tc39/proposal-decorators/issues/468

class A {
    static accessor x;

    @(() => {}) static accessor y;
}

class B extends A {}

expect(() => B.x).not.toThrow();
expect(() => B.y).not.toThrow();
