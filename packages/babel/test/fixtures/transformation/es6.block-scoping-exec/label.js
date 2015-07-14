var heh = [];
var nums = [1, 2, 3];

loop1:
for (let i in nums) {
  let num = nums[i];
  heh.push(x => x * num);
  if (num >= 2) {
    break loop1;
  }
}

assert.equal(heh.length, 2);
assert.equal(heh[0](2), 2);
assert.equal(heh[1](4), 8);
