class X {
  a
  foo = 2
  bar: number = 3
  baz: ?string
  qux: { foo: string | 2 | 3 } = { foo: 's' }
  v: (a/* x = y */: string) => void
  w: (a/* x = y */: string) => number = (a/* x = y */: string) => 2
  x: (a: string) => string
  y: (a: string) => string = (a: string) => '2'
  z: (a: string) => (b: number) => { x: string, y: number } = (a: string) => (b: number) => ({ x: a, y: b })
}
