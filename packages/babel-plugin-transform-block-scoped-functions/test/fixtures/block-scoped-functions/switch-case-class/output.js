{
  var K;
  var h = function h() {
    return new K().v();
  };
  switch (1) {
    case 1:
      K = class K {
        v() {
          return "ok";
        }
      };
      expect(h()).toBe("ok");
  }
}
