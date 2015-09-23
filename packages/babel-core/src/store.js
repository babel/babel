/* @flow */

export default class Store {
  constructor() {
    this.dynamicData = {};
    this.data = {};
  }

  dynamicData: Object;
  data: Object;

  set(key: string, val: any): any {
    return this.data[key] = val;
  }

  setDynamic(key: string, fn: Function) {
    this.dynamicData[key] = fn;
  }

  get(key: string): any {
    let data = this.data[key];
    if (data) {
      return data;
    } else {
      let dynamic = this.dynamicData[key];
      if (dynamic) {
        return this.set(key, dynamic());
      }
    }
  }
}
