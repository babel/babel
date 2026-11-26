var Outer = "outer";

enum Flags { Outer = 8 }

function parse(kind: number) {
  if (kind > 0) {
    enum Flags { None = 0, Read = 1 << 0 }
    enum Flags { Write = 1 << 1, ReadWrite = Read | Write }
    return Flags;
  }
}

function nested() {
  {
    enum Flags { Inner = Outer }
    return Flags;
  }
}

const f = parse(1);
expect(f.None).toBe(0);
expect(f.Read).toBe(1);
expect(f.Write).toBe(2);
expect(f.ReadWrite).toBe(3);
expect(nested().Inner).toBe("outer");
expect(Flags.Outer).toBe(8);
