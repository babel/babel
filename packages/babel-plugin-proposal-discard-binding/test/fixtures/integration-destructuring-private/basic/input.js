let y;

class C {
  static #p;
  static #x;

  static {
    function f0(x, { #p: void }, [ z, void ]) {}

    try {} catch ([void, { #p: void, ...rest }]) {}

    for (const {#x: void, y } of []);

    for (let {valueOf: void, ...rest } in {});

    for ({#x: void, y } of []);

    for ({valueOf: void, ...rest } in {});

    ([void, { #p: void, ...rest }] = [0, { p: 1, q: 2, r: 3 }]);

    var [void, { #p: void, ...rest }] = [0, { p: 1, q: 2, r: 3 }];
  }
}
