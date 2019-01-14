
const log = [];

(function () {
  // _label:   // TODO: known failure
  do {
    { log.push(0); }
    _label2: if (1) {
      { { log.push(1); } }
      { break _label2; }
      log.push(2);
    }
    log.push(3);
    continue; // _label;  // goes with known-failing bit above
    log.push(4);
  } while (0);
  log.push(5);
})();

expect(log.join("")).toBe("0135");
