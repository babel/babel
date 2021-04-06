class C extends D {
  override p1() {}
  override [p + '2']() {}
  override p3 = () => {};

  public override p4() {}
  private override p5() {}
  protected override p6() {}

  override async p7() {}
  public override async p8() {}
}
