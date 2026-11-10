function lastSize(rows) {
  var width = "n/a";
  {
    let width, height;
    for ({ width, height } of rows);
    for ([width] in rows);
    return [width, height];
  }
}
