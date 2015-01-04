class Tripler {
  static triple(n=1) {
    return n * 3;
  }

  static toString() {
    return '3' + super() + '3';
  }
}

class MegaTripler extends Tripler {
  static triple(n=1) {
    return super(n) * super(n);
  }
}

var tripler = new Tripler();

assert.equal(Tripler.triple(), 3);
assert.equal(Tripler.triple(2), 6);
assert.equal(tripler.triple, undefined);

assert.equal(Tripler.toString(), '3' + Object.toString.call(Tripler) + '3');

var mega = new MegaTripler();

assert.equal(MegaTripler.triple(2), 36);
assert.equal(mega.triple, undefined);

assert.equal(MegaTripler.toString(), '3' + Object.toString.call(MegaTripler) + '3');
