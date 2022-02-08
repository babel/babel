const dec = () => {}; 
@dec
class Class {
  @dec a;
  @dec b() {}
  @dec get c() {}
  @dec set c(v) {}
  @dec accessor d;

  @dec #e;
  @dec #f() {}
  @dec get #g() {}
  @dec set #g(v) {}
  @dec accessor #h;

  @dec static i;
  @dec static j() {}
  @dec static get k() {}
  @dec static set l(v) {}
  @dec static accessor m;

  @dec static #n;
  @dec static #o() {}
  @dec static get #p() {}
  @dec static set #q(v) {}
  @dec static accessor #r;
}
