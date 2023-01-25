// https://github.com/babel/babel/pull/15361

function fooBar(arrayOfThings) {
    for (let index = 0; index < arrayOfThings.length; index++) {
      const thing = arrayOfThings[index];
      const someMapObj = {};
      let arrow = (x) => someMapObj;
      arrow(0)
    }
}

fooBar([1,2,3])
