const assign = function([...arr], index, value) {
  arr[index] = value;
  return arr;
}

const arr = [1, 2, 3];
assign(arr, 1, 42);

expect(arr).toEqual([1, 2, 3]);
