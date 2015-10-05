/* @flow */

export default class Store extends Map {
  constructor() {
    super();
    this.dynamicData = {};
  }

  dynamicData: Object;

  setDynamic(key, fn) {
    this.dynamicData[key] = fn;
  }

  get(key: string): any {
    if (this.has(key)) {
      return super.get(key);
    } else {
      let dynamic = this.dynamicData[key];
      if (dynamic) {
        return this.set(key, dynamic());
      }
    }
  }
}
