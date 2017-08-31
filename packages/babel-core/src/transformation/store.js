export default class Store {
  constructor() {
    this._map = new Map();
    this._map.dynamicData = {};
  }

  setDynamic(key, fn) {
    this._map.dynamicData[key] = fn;
  }

  set(key: string, val) {
    this._map.set(key, val);
  }

  get(key: string): any {
    if (this._map.has(key)) {
      return this._map.get(key);
    } else {
      if (Object.prototype.hasOwnProperty.call(this._map.dynamicData, key)) {
        const val = this._map.dynamicData[key]();
        this._map.set(key, val);
        return val;
      }
    }
  }
}
