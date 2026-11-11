const p = {
  tag(strings) {
    return [this, strings[0]];
  },
};
const o = {
  p,
  tag(strings) {
    return [this, strings[0]];
  },
};

expect((o?.tag)`a`).toEqual([o, "a"]);
expect((o?.p.tag)`b`).toEqual([p, "b"]);
expect((o.p?.tag)`c`).toEqual([p, "c"]);
