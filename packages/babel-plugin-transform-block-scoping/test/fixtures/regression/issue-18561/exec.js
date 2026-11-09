function lastSize(rows) {
  var width = "n/a";
  {
    let width, height;
    for ({ width, height } of rows);
    return [width, height];
  }
}
expect(lastSize([{ width: 2, height: 3 }, { width: 4, height: 5 }])).toEqual([4, 5]);

function lastKey(obj) {
  var key = "n/a";
  {
    let key;
    for ([key] in obj);
    return key;
  }
}
expect(lastKey({ ab: 1, cd: 2 })).toBe("c");
