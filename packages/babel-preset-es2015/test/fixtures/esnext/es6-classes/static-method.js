class Tripler {
  static triple(n=1) {
    return n * 3;
  }

  static toString() {
    return '3' + super.toString() + '3';
  }
}

class MegaTripler extends Tripler {
  static triple(n=1) {
    return super.triple(n) * super.triple(n);
  }
}

var tripler = new Tripler();

expect(Tripler.triple()).toBe(3);
expect(Tripler.triple(2)).toBe(6);
expect(tripler.triple).toBeUndefined();

expect(Tripler.toString()).toBe('3' + Object.toString.call(Tripler) + '3');

var mega = new MegaTripler();

expect(MegaTripler.triple(2)).toBe(36);
expect(mega.triple).toBeUndefined();

expect(MegaTripler.toString()).toBe('3' + Object.toString.call(MegaTripler) + '3');
