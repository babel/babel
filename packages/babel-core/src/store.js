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
      if (Object.prototype.hasOwnProperty.call(this.dynamicData, key)) {
        const val =  this.dynamicData[key]();
        this.set(key, val);
        return val;
      }
    }
  }
}
