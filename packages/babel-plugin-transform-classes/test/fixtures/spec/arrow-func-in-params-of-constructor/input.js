class Root {}

class Foo extends Root {
  constructor(
    cb = () => {
      console.log("this is", this);
    }
  ) {
    super();
    this.cb = cb;
  }
}
