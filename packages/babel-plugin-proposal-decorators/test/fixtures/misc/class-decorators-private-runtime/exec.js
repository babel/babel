function deco() {}

function makePriv(el) {
  el.key = priv;
}

let pn;
void class {
  @(el => { pn = el.key; el.key = "foo"; })
  #priv;
};

expect(() => {
  @deco
  class A {
    @makePriv
    foo;
  }
}).toThrow();
