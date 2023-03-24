class B {
  #p() {
    const m = module {
      class C { [this.#p]; }
    };
  }
}
