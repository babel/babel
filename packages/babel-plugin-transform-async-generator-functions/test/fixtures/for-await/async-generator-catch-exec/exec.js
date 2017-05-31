async function* genAnswers() {
  let stream = [ Promise.resolve(4), Promise.resolve(9), Promise.resolve(12) ];
  let total = 0;
  for await (let val of stream) {
    total += await val;
    yield total;
  }
}

function forEach(ai, fn) {
  return ai.next().then(function (r) {
    if (r.done) {
      throw Error("done");
    } else {
      fn(r);
      return forEach(ai, fn);
    }
  });
}

let output = 0;
return forEach(genAnswers(), function(val) { output += val.value })
.catch((error) => {
  assert.equal(error.message, "done");
  assert.equal(output, 42);
});
