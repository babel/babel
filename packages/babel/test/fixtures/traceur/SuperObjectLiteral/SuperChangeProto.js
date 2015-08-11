var log = '';

var base  = {
  p() { log += '[base]'; }
};

var otherBase = {
  p() { log += '[otherBase]'; }
};

var derived = {
  __proto__: base,
  p() {
    log += '[derived]';
    super.p();
    derived.__proto__ = otherBase;
    super.p();
  }
};

derived.p();
assert.equal(log, '[derived][base][otherBase]');
