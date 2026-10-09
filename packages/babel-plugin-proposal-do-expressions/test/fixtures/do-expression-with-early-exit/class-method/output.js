class C {
  constructor({
    ...x
  }, y) {
    this.y = y;
    {
      if (Object.keys(x).length > 0 && y) {
        return this.result = 'xy';
      } else if (Object.keys(x).length > 0) {
        return this.result = 'x';
      } else if (y) {
        return this.result = 'y';
      }
    }
    const z = void 0;
  }
}
