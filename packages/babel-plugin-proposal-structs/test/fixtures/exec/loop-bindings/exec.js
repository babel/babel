const structs = [];
for (const key of ["x", "y"]) {
  let captured = key + "!";
  struct L {
    [key] = captured;
    f = () => captured;
    c;
    constructor() {
      this.c = captured;
    }
  }
  structs.push(L);
}
const [x, y] = structs.map(L => new L());
expect([x.x, x.f(), x.c]).toEqual(["x!", "x!", "x!"]);
expect([y.y, y.f(), y.c]).toEqual(["y!", "y!", "y!"]);
