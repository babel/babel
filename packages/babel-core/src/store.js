export default class Store {
  dynamicData        = {};
  data               = {};

  set(key: string, val): any {
    return this.data[key] = val;
  }

  setDynamic(key: string, fn: Function) {
    this.dynamicData[key] = fn;
  }

  get(key: string): any {
    var data = this.data[key];
    if (data) {
      return data;
    } else {
      var dynamic = this.dynamicData[key];
      if (dynamic) {
        return this.set(key, dynamic());
      }
    }
  }
}
