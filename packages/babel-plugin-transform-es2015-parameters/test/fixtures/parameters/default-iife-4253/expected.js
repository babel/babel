class Ref {
  constructor(..._ref) {
    let [id = ++Ref.nextID] = [..._ref];

    this.id = id;
  }
}
Ref.nextID = 0;