var re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

var result = re.exec("2017-12-23");

expect(result.groups).toEqual({
  year: "2017",
  month: "12",
  day: "23",
});

expect(result.groups).toEqual({
  year: result[1],
  month: result[2],
  day: result[3],
});
