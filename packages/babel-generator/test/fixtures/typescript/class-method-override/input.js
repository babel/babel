class C extends D {
    override [Symbol.iterator](): void;
    override [Symbol.iterator]?(): void;

    override p1() {}
    override ['p' + '2']() {}

    public override p3() {}
    private override p4() {}
    protected override p5() {}

    override async p6() {}
    public override async p7() {}
}
