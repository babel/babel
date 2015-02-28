interface A {}
interface A extends B {}
interface A<T> extends B<T>, C<T> {}
interface A { foo: () => number; }
interface Dictionary { [index: string]: string; length: number; }
class Foo implements Bar {}
class Foo2 extends Bar implements Bat, Man<number> {}
class Foo3 extends class Bar implements Bat {} {}
class Foo4 extends class Bar implements Bat {} implements Man {}
