
const log = [];

(function () {
  _label:
  do {
    { log.push(0); }
    _label2: if (1) {
      { { log.push(1); } }
      { break _label2; }
      log.push(2);
    }
    log.push(3);
    continue _label;
    log.push(4);
  } while (0);
  log.push(5);
})();

expect(log.join("")).toBe("0135");
