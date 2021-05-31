class C1<+T, -U> {}

function f<+T, -U>() {}

type T<+T, -U> = {};
type T2 = {
  +p: T
};
type T3 = {
  -p: T
};
type T4 = {
  +[k: K]: V
};
type T5 = {
  -[k: K]: V
};
interface I1 {
  +p: T
}
interface I2 {
  -p: T
}
interface I3 {
  +[k: K]: V
}
interface I4 {
  -[k: K]: V
}
declare class I {
  +p: T
}
declare class I {
  -p: T
}
declare class I {
  +[k: K]: V
}
declare class I {
  -[k: K]: V
}

class C2 {
  +p: T = e;
}

class C3 {
  -p: T = e;
}