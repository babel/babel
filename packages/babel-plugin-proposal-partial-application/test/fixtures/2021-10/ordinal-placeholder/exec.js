const printABC = (a, b, c) => [a, b, c];
const printCAA = printABC~(?2, ?, ?0);
expect(printCAA(1, 2, 3)).toEqual([3, 1, 1]);
expect(printCAA.length).toBe(3);

const swap = printABC~(?1, ?0);
expect(swap(1, 2)).toEqual([2, 1, undefined]);
expect(swap.length).toBe(2);

const identity = x => x;
expect([5, 6, 7].map(identity~(?1))).toEqual([0, 1, 2]);
