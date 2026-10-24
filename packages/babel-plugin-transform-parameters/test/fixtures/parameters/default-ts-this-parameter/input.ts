function f(this: Foo, a = 1, b) {}

function g(this: Foo, [a]: number[] = [], ...rest: any[]) {}
