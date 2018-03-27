// a = animal, n = name, sn = super name, fn = full name, wn = with name

class Animal {
  constructor(n) {
    this.n1 = n + ' Animal';
  }
  get n() { return this.n1; }
}

class Roo extends Animal {
  constructor(n) {
    class Koala extends Animal {
      constructor(n) {
        super(n);
        this.n2 = n + ' Koala';
      }
      get n() { return this.n2; }
      get sn() { return super.n; }
      get fn() { return this.n + ' aka ' + this.sn; }
    }

    super(n);
    this.a = new Koala(n + ' II');
    this.n2 = n + ' Roo';
  }
  wn(n) {
    return ' (with ' + n + ')';
  }
  get n() { return this.n2 + this.wn(this.a.n); }
  get sn() { return super.n + this.wn(this.a.sn); }
  get fn() { return this.n + ' aka ' + this.sn + this.wn(this.a.fn); }
}

// ----------------------------------------------------------------------------

var o = new Roo('Kanga');
expect(o.a.n).toBe('Kanga II Koala');
expect(o.a.sn).toBe('Kanga II Animal');
expect(o.a.fn).toBe('Kanga II Koala aka Kanga II Animal');

expect(o.n).toBe('Kanga Roo (with Kanga II Koala)');
expect(o.sn).toBe('Kanga Animal (with Kanga II Animal)');
expect(o.fn).toBe('Kanga Roo (with Kanga II Koala) aka ' +
             'Kanga Animal (with Kanga II Animal) ' +
             '(with Kanga II Koala aka Kanga II Animal)');
