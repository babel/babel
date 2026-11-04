(-x)<T>;
(a + b)<T>;
(x++)<T>;
(() => {})<T>;
(a ? b : c)<T>;
(a = b)<T>;
async function f() {
  (await x)<T>;
}
function* g() {
  (yield x)<T>;
}
