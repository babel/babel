type A = interface {
  p: string
};
type B = interface extends X {
  p: string
};
type C = interface extends X, Y {
  p: string
};
type D = interface extends X.Y<Z> {
  p: string
};
