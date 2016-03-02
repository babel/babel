export default class Store extends Map {
  constructor() {
    super();
    this.dynamicData = {};
  }

  setDynamic(key, fn) {
    this.dynamicData[key] = fn;
  }

  get(key) {
    if (this.has(key)) {
      return super.get(key);
    } else {
      if (Object.prototype.hasOwnProperty.call(this.dynamicData, key)) {
        let val =  this.dynamicData[key]();
        this.set(key, val);
        return val;
      }
    }
  }
}
