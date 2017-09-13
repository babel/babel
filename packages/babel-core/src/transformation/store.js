export default class Store {
  constructor() {
    this._map = new Map();
  }

  set(key: string, val) {
    this._map.set(key, val);
  }

  get(key: string): any {
    if (this._map.has(key)) {
      return this._map.get(key);
    }
  }
}
