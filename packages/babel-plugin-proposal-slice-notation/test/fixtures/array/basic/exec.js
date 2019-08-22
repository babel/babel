var arr = [0, 1, 2, 3, 4];
 // length > end > start = 0
expect(arr[0:3:]).toEqual([0, 1, 2]);

 // length > end > start = 0, step > 1
expect(arr[0:3:2]).toEqual([0, 2]);

 // length > end > start = 0, step = -1
expect(arr[0:3:-1]).toEqual([]);

 // length > end = start > 0
expect(arr[3:3:]).toEqual([]);

 // length > end = start > 0, step > 1
expect(arr[3:3:2]).toEqual([]);

 // length > end = start > 0, step = -1
expect(arr[3:3:-1]).toEqual([]);

 // length > start > end > 0
expect(arr[4:2:]).toEqual([]);

 // length > start > end > 0, step > 1
expect(arr[4:2:2]).toEqual([]);

 // length > start > end > 0, step = -1
expect(arr[4:2:-1]).toEqual([4, 3]);

 // length > start > end > 0, step = -2
expect(arr[4:2:-2]).toEqual([4]);

 // length = end = start > 0
expect(arr[5:5:]).toEqual([]);

 // length = end = start > 0, step > 1
expect(arr[5:5:2]).toEqual([]);

 // length = end = start > 0, step = -1
expect(arr[5:5:-1]).toEqual([]);

 // length = end = start > 0, step = -2
expect(arr[5:5:-2]).toEqual([]);

 // length = end > start > 0
expect(arr[3:5:]).toEqual([3, 4]);

 // length = end > start > 0, step = -1
expect(arr[3:5:-1]).toEqual([]);

 // length > end > start > 0;
expect(arr[2:4:]).toEqual([2, 3]);

 // length > end > start > 0, step > 1
expect(arr[2:4:2]).toEqual([2]);

 // length > end > start > 0, step < 0
expect(arr[2:4:-1]).toEqual([]);

 // end > length > start > 0
expect(arr[3:6:]).toEqual([3, 4]);

 // end > length > start > 0, step = 2
expect(arr[3:6:2]).toEqual([3]);

 // end > length > start > 0, step = -1
expect(arr[3:6:-1]).toEqual([]);

 // length > end = abs(start), start < 0
expect(arr[-3:3:]).toEqual([2]);

 // length > end = abs(start), start < 0, step < 0
expect(arr[-3:3:-1]).toEqual([]);

 // length = end > abs(start), start < 0
expect(arr[-1:5:]).toEqual([4]);

 // length = end > abs(start), start < 0, step < 0
expect(arr[-1:5:-1]).toEqual([]);

 // abs(start) = length > end > 0, start < 0
expect(arr[-5:1:]).toEqual([0]);

 // abs(start) = length > end > 0, start < 0, step < 0
expect(arr[-5:1:-1]).toEqual([]);

 // abs(start) > length = end > 0, start < 0
expect(arr[-9:5:]).toEqual([0, 1, 2, 3, 4]);

 // abs(start) > length = end > 0, start < 0, step > 1
expect(arr[-9:5:2]).toEqual([0, 2, 4]);

 // abs(start) > length = end > 0, start < 0, step = -1
expect(arr[-9:5:-1]).toEqual([]);

 // length > abs(end) > start = 0, end < 0
expect(arr[0:-2:]).toEqual([0, 1, 2]);

 // length > abs(end) > start = 0, end < 0, step > 1
expect(arr[0:-2:2]).toEqual([0, 2]);

 // length > abs(end) > start = 0, end < 0, step = -1
expect(arr[0:-2:-1]).toEqual([]);

 // length > abs(end) > start > 0, end < 0
expect(arr[1:-4:]).toEqual([]);

 // length > abs(end) > start > 0, end < 0, step = -1
expect(arr[1:-4:-1]).toEqual([]);

 // length = abs(end) > start = 0, end < 0
expect(arr[0:-5:]).toEqual([]);

 // length = abs(end) > start = 0, end < 0, step = -1
expect(arr[0:-5:-1]).toEqual([]);

 // abs(end) > length > start > 0, end < 0
expect(arr[4:-9:]).toEqual([]);

 // abs(end) > length > start > 0, end < 0, step = -1
expect(arr[4:-9:-1]).toEqual([4, 3, 2, 1, 0]);

 // abs(end) > length > start > 0, end < 0, step = -2
expect(arr[4:-9:-2]).toEqual([4, 2, 0]);

 // -length = start < end < 0
expect(arr[-5:-2:]).toEqual([0, 1, 2]);

 // -length = start < end < 0, step = -1
expect(arr[-5:-2:-1]).toEqual([]);

 // -length < start < end < 0
expect(arr[-3:-1:]).toEqual([2, 3]);

 // -length < start < end < 0, step = -1
expect(arr[-3:-1:-1]).toEqual([]);

 // start < -length < end < 0
expect(arr[-9:-1:]).toEqual([0, 1, 2, 3]);

 // start < -length < end < 0, step = -1
expect(arr[-9:-1:-1]).toEqual([]);

 // start = end < -length
expect(arr[-6:-6:]).toEqual([]);

 // start = end < -length, step = -1
expect(arr[-6:-6:-1]).toEqual([]);

 // end === undefined
expect(arr[3::]).toEqual([3, 4]);

 // end === undefined, step = -1
expect(arr[3::-1]).toEqual([3, 2, 1, 0]);

 // start is not integer
expect(arr[2.5:4:]).toEqual([2, 3]);

 // start is not integer, step = -1
expect(arr[2.5:4:-1]).toEqual([]);

 // start = NaN
expect(arr[NaN:3:]).toEqual([0, 1, 2]);

 // start = NaN, step = -1
expect(arr[NaN:3:-1]).toEqual([]);

 // start = Infinity
expect(arr[Infinity:3:]).toEqual([]);

 // start = Infinity, step = -1
expect(arr[Infinity:3:-1]).toEqual([4]);

 // start = -Infinity
expect(arr[-Infinity:3:]).toEqual([0, 1, 2]);

 // start = -Infinity, step = -1
expect(arr[-Infinity:3:-1]).toEqual([]);

 // end is not integer
expect(arr[2:4.5:]).toEqual([2, 3]);

 // end is not integer, step = -1
expect(arr[4:2.5:-1]).toEqual([4, 3]);

 // end = NaN
expect(arr[0:NaN:]).toEqual([]);

 // end = NaN, step = -1
expect(arr[0:NaN:-1]).toEqual([]);

 // end = Infinity
expect(arr[0:Infinity:]).toEqual([0, 1, 2, 3, 4]);

 // end = Infinity, step = -1
expect(arr[0:Infinity:-1]).toEqual([]);
