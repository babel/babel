function test(date, defValue = 1) {
  var date = date + defValue;
  return date;
}

expect(test(2)).toBe(3);
