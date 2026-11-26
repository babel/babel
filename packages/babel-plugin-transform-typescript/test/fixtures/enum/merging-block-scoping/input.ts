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
