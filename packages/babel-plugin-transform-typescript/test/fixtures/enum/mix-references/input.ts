var x = 10;

enum Foo {
    a = 10,
    b = a,
    c = b + x,
}

enum Bar {
    D = Foo.a,
    E = D,
    F = Math.E,
    G = E + Foo.c,
}

enum Baz {
    a = 0,
    b = 1,
    // @ts-ignore
    x = a.toString(),
}