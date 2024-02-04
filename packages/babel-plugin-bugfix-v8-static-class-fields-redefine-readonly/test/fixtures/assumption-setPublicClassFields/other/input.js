class A {
    static {
        // side effect
        foo(A);
    }

    static x = 1;
    static [y] = 2;

    name = 3;
    length = 4;
}