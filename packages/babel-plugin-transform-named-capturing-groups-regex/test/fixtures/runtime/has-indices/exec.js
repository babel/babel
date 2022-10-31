var re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/d;

var result = re.exec("2017-12-23");

expect(result.indices.groups).toEqual({
  year: [0, 4],
  month: [5, 7],
  day: [8, 10],
});

expect(result.indices.groups).toEqual({
  year: result.indices[1],
  month: result.indices[2],
  day: result.indices[3],
});
