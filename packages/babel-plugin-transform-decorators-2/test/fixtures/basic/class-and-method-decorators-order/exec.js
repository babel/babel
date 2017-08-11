const calls = [];

function classDec(arg) {
  calls.push(3);
  return function (constructor, heritage, elements) {
    calls.push(4);
    return {constructor, elements, finishers: []};
  }
}

function methDec(arg) {
  calls.push(1);
  return function (descriptor){
    calls.push(2);
    return {descriptor, extras:[], finishers:[] };
  }
}



@classDec("arg") class A {
  constructor () {}
  @methDec("arg") method1() {}
}

assert.deepEqual(calls, [1, 2, 3, 4]);
