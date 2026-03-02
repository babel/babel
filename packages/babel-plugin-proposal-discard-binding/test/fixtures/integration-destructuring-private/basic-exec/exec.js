let y;

class C {
  static #p;
  static #x;

  static {
    (function f0(x, { #p: void }, [ z, void ]) {})(0, C, []);

    try {
      throw [,C]
    } catch ([void, { #p: void, ...rest }]) {}

    for (const {#x: void, y } of [C]);

    for (let {valueOf: void, ...rest } in {});

    for ({#x: void, y } of [C]);

    for ({valueOf: void, ...rest } in {});

    ([void, { #p: void, ...rest }] = [0, C]);

    var [void, { #p: void, ...rest }] = [0, C];
  }
}
