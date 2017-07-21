let decorate = () => void 0,
    dec,
    bar,
    foo = {
  bar: () => void 0
},
    baz,
    decorator; //just to supress ReferenceErrors


let _key;

let Bizz = decorate(class Bizz {
  m1() {
    yo
  }

  m2() {
    yo
  }

  static [(_key = 3 + 7)]() {
    yo
  }

}, [["m1", [dec]], ["m2", [foo.bar(baz), bar]], [_key, [dec], true]], [decorator]);
