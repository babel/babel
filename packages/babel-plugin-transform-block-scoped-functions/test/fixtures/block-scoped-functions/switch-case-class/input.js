switch (1) {
  case 1:
    class K {v() {return "ok"; }}
    function h() { return new K().v(); }
    expect(h()).toBe("ok");
}
