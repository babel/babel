declare class C {
  static [[foo]]: T
}
declare class C {
  [[foo]]: T
}
interface I1 {
  [[foo]]: X
}
interface I2 {
  [[foo]]() => X
}
type T1 = {
  [[foo]]: X
};
type T2 = {
  [[foo]]() => X
};
type T3 = {
  [[foo]]?: X
};