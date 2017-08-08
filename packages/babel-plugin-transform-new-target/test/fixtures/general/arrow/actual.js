function Foo() {
  const a = () => {
    new.target;
  };
}

class Bar {
  constructor() {
    const a = () => {
      new.target;
    };
  }
}
