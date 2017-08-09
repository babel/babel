const calls = [];

function classDec(constructor, heritage, elements) {
  calls.push("classDec evaluated");
  return {constructor, elements, finishers: []};
}

function methDec(descriptor){
  calls.push("methDec evaluated");
  return {descriptor, extras:[], finishers:[] };
}



@classDec class A {
  constructor () {
    calls.push("ctor called");
  }

  @methDec method1() {
    calls.push("method1 called");
  }
}

assert.deepEqual(["methDec evaluated", "classDec evaluated"], calls);
