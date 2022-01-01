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
