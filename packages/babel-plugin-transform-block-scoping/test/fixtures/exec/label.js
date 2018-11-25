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

expect(heh).toHaveLength(2);
expect(heh[0](2)).toBe(2);
expect(heh[1](4)).toBe(8);
