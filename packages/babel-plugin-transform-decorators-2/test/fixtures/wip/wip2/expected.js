let A = babelHelpers.decorate(class A {
  method() {
    console.log("method executed");
  }

  static estatic() {
    console.log("estatic executed");
  }

}, [], [["method", [methDec2, methDec]], ["estatic", [methDec], true]], void 0)([]);

function methDec(descriptor) {
  console.log("methDec executed", arguments);
  return {
    descriptor,
    extras: [],
    finishers: []
  };
}

function methDec2(descriptor) {
  console.log("methDec2 executed", arguments);
  return {
    descriptor,
    extras: [],
    finishers: []
  };
}

function classDec(constructor, heritage, memberDescriptors) {
  console.log("class executed", arguments);
  return {
    constructor,
    elements: memberDescriptors,
    finishers: []
  };
}