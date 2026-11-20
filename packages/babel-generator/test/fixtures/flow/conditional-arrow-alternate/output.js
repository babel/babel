(a ? (x: T) : (U => v): W);
(a ? (x, y) : (U => v): W);
(a ? (x: T) : (U => v): W);
(a ? (x: T) : (([U]) => v): W);
(a ? () => (x: T) : (U => v): W);
(a ? async () => (x, y) : (U => v): W);
(a ? () => ({
  x
}) : (U => v): W);
(a ? () => ({
  x
} = y) : (U => v): W);
(a ? b += (x: T) : (U => v): W);
(a ? b ? c : (x: T) : (U => v): W);
(a ? (/* c */x) : (U => v): W);
switch (0) {
  case a ? (x: T) : (U => v):
}
a ? (x: T) : (U => v);
a ? x : U => v;
a ? f(x) : U => v;
a ? () => ({}).x : U => v;