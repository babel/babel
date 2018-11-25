// https://github.com/babel/babel/issues/5817

class Parent {}

class Table extends Parent {
  constructor() {
    super();
    this.returnParam = (param) => {
      return param;
    }
  }
}

const table = new Table();

expect(table.returnParam(false)).toBe(false);
