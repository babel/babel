{
  let name;
  using _ = (0, class {
    static _ = name = this.name;
    static [Symbol.dispose || Symbol.for("Symbol.dispose")]() {}
  });
}
