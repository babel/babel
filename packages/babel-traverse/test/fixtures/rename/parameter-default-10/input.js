let a = "outside";

function r({ a: b }, { [a]: { c } = a }) {
  g(a);
}
