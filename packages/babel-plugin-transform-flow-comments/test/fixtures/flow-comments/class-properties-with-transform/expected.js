class X {
  constructor() {
    this.foo = 2;
    this.bar = 3;
    this.qux = { foo: 's' };

    this.w = (a /* x = y */ /*: string*/) => 2;

    this.y = (a /*: string*/) => '2';

    this.z = (a /*: string*/) => (b /*: number*/) => ({ x: a, y: b });
  }

  /*:: bar: number*/ /*:: baz: ?string*/
  /*:: static d: ?number*/ /*:: static e: ?number*/
  /*:: qux: { foo: string | 2 | 3 }*/ /*:: v: (a/* x = y *-/: string) => void*/
  /*:: w: (a/* x = y *-/: string) => number*/ /*:: z: (a: string) => (b: number) => { x: string, y: number }*/ /*:: x: (a: string) => string*/ /*:: y: (a: string) => string*/
}
X.e = 3;
