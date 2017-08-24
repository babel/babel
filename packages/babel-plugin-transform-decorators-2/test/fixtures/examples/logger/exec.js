const calls = [];

function log(message) {
  return function (descriptor) {
    let propertyDescriptor = descriptor.descriptor;
    let oldFunc = propertyDescriptor.value;
    propertyDescriptor.value = function(...args) {
      calls.push(message + " entered");
      let result = oldFunc.apply(this, args);
      calls.push(message + " exited");
      return result;
    }
    return {descriptor, extras: [], finishers: []};
  }
}

class Foo {
  @log("method1") method1() {
    assert.equal(this.method2(), 6);
    return 4;
  }
  @log("method2") method2() {return 6;}
  @log("method3") method3() {return 8;}
}

let foo = new Foo();

assert.equal(foo.method1(), 4);
assert.equal(foo.method3(), 8);
assert.deepEqual(calls, ["method1 entered", "method2 entered", "method2 exited", "method1 exited", "method3 entered", "method3 exited"]);


