var re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

var result = "1999-09-29".match(re);

expect(result.groups).toEqual({
  year: "1999",
  month: "09",
  day: "29",
});

expect(result.groups).toEqual({
  year: result[1],
  month: result[2],
  day: result[3],
});
