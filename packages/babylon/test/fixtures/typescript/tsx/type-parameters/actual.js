type A<T> = {};
type A = <T>() => {}

var x: <T>() => {} = async <T>() => {};

function f<T>(param: <T>() => {}): <T>() => {} {}
class C<T> {
  property: <T>() => {};
  method<T>() {}
}

interface I<T> {
  new <T>(): T,
  <T>(): T,
  [name: string]: <T>() => {}
};

x as <T>() => {};
