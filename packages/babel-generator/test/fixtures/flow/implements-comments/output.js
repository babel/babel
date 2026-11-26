class A implements B<T> /* 1*/ {}
class C implements D<T> {} /* 2
                           */
class E extends F implements G<T>, H<U> /* 3*/ {
  x: number;
}