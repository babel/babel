class Ref {
  constructor(ref = Ref) {
    this.ref = ref
  }
}

expect(new Ref().ref).toBe(Ref);
