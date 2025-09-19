class ExtendedArray extends Array {
  constructor(...args) {
    super(...args);
  }
}

let extArr = new ExtendedArray(1,2,3,4,5);
let [first, second , ...rest] = extArr;

expect(Object.getPrototypeOf(rest).constructor.name).toBe("Array");
