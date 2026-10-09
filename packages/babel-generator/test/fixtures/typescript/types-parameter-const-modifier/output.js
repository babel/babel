class C0<const T> {
  p: () => T;
}
class C1<const in T> {
  p: (x: T) => void;
}
class C2<const out T> {
  p: () => T;
}
class C3<const in out T> {
  p: (x: T) => T;
}