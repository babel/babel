// Ref: https://github.com/babel/babel/issues/16219

console.log(typeof value === "object");

class AxiosHeaders {
  [Symbol.iterator]() {
    return;
  }
}
