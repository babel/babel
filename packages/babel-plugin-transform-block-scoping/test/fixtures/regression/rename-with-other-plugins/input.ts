// `index` will be registered into `scope.globals`
type SomeLookup = {
  [index: number]: any[];
};

function fooBar(arrayOfThings) {
    for (let index = 0; index < arrayOfThings.length; index++) {
      const thing = arrayOfThings[index];
      const someMapObj = {};
      let arrow = (x) => someMapObj;
      arrow(0)
    }
}

fooBar([1,2,3])
