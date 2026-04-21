function customElement(tag) {
  return (cls, ctx) => { ctx.addInitializer(() => {}); };
}

class Base {
  static styles = ["base"];
}

@customElement("derived")
class Derived extends Base {
  static styles = [...super.styles, "derived"];
}
