function a<const T>() {}
function b<const T extends U>() {}
function c<T, const U>() {}
declare function d<const T>();
<const T>() => {};
<const T extends U>() => {};

class A<const T> {}
class B<const T extends U> {}
class C<T, const U> {}
class D<in const T> {}
class E<const in T> {}

interface I<const T> {}
interface J<const T extends U> {}
interface K<T, const U> {}
interface L<in const T> {}
interface M<const in T> {}

class _ {
  method<const T>() {}
  method<const T extends U>() {}
  method<T, const U>() {}
}
